import template from "@babel/template";


const basicTemplate = template(
  `
  if (typeof window !== 'undefined') {
    window.postMessage({
      name: "__REACT_LIFECYCLE_TRACER_EVENT__",
      payload: {
        component: COMPONENT,
        method: METHOD,
      }
    }, "*")
  }
`,
  {
    placeholderPattern: false,
    placeholderWhitelist: new Set(["COMPONENT", "METHOD"])
  }
);

const detailedTemplate = template(
  `
  if (typeof window !== 'undefined') {
    window.postMessage({
      name: "__REACT_LIFECYCLE_TRACER_EVENT__",
      payload: {
        component: COMPONENT,
        method: METHOD,
        state: JSON.parse(JSON.stringify(this.state)),
      }
    }, "*")
  }
`,
  {
    placeholderPattern: false,
    placeholderWhitelist: new Set(["COMPONENT", "METHOD"])
  }
);


const lifeCycleMethods = {
  constructor: basicTemplate,
  componentDidMount: detailedTemplate,
  componentDidUpdate: detailedTemplate,
  componentWillUnmount: detailedTemplate,
  shouldComponentUpdate: detailedTemplate,
  getDerivedStateFromProps: basicTemplate,
  getSnapshotBeforeUpdate: detailedTemplate,
  componentDidCatch: detailedTemplate,
  render: detailedTemplate
};

function buildTracerAST(componentName, methodName) {
  return lifeCycleMethods[methodName.value]({
    METHOD: methodName,
    COMPONENT: componentName
  });
}

export default function({ types }) {
  return {
    visitor: {
      Program(programPath) {
        programPath.traverse({
          ClassMethod(classMethodPath) {
            const componentName = classMethodPath.parentPath.parent.id.name;
            const methodName = classMethodPath.node.key.name;
            if (methodName in lifeCycleMethods) {
              const tracerAST = buildTracerAST(
                types.stringLiteral(componentName),
                types.stringLiteral(methodName)
              );
              classMethodPath.get("body").unshiftContainer("body", tracerAST);
            }
          }
        });
      }
    }
  };
}
