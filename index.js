import template from "@babel/template";

const lifeCycleMethods = new Set([
  "constructor",
  "componentDidMount",
  "componentDidUpdate",
  "componentWillUnmount",
  "shouldComponentUpdate",
  "getDerivedStateFromProps",
  "getSnapshotBeforeUpdate",
  "componentDidCatch",
  "render"
]);

const tracerTemplate = template(
  `
  if (typeof window !== 'undefined') {
    window.postMessage({
      name: "__REACT_LIFECYCLE_TRACER_EVENT__",
      playload: {
        component: COMPONENT,
        method: METHOD
      }
    }, "*")
  }
`,
  {
    placeholderPattern: false,
    placeholderWhitelist: new Set(["COMPONENT", "METHOD"])
  }
);

function buildTracerAST(componentName, methodName) {
  return tracerTemplate({
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
            if (lifeCycleMethods.has(methodName)) {
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
