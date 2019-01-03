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
  window.postMessage({
    name: "__REACT_LIFECYCLE_TRACER_EVENT__",
    playload: {
      component: COMPONENT,
      method: METHOD
    }
  }, "*")
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
      ClassMethod(path) {
        const componentName = path.parentPath.parent.id.name;
        const methodName = path.node.key.name;
        if (lifeCycleMethods.has(methodName)) {
          const tracerAST = buildTracerAST(
            types.stringLiteral(componentName),
            types.stringLiteral(methodName)
          );
          path.get("body").unshiftContainer("body", tracerAST);
        }
      }
    }
  };
}