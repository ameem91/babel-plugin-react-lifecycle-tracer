"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _template = _interopRequireDefault(require("@babel/template"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lifeCycleMethods = new Set(["constructor", "componentDidMount", "componentDidUpdate", "componentWillUnmount", "shouldComponentUpdate", "getDerivedStateFromProps", "getSnapshotBeforeUpdate", "componentDidCatch", "render"]);
var tracerTemplate = (0, _template.default)("\n  if (typeof window !== 'undefined') {\n    window.postMessage({\n      name: \"__REACT_LIFECYCLE_TRACER_EVENT__\",\n      playload: {\n        component: COMPONENT,\n        method: METHOD\n      }\n    }, \"*\")\n  }\n", {
  placeholderPattern: false,
  placeholderWhitelist: new Set(["COMPONENT", "METHOD"])
});

function buildTracerAST(componentName, methodName) {
  return tracerTemplate({
    METHOD: methodName,
    COMPONENT: componentName
  });
}

function _default(_ref) {
  var types = _ref.types;
  return {
    visitor: {
      Program: function Program(programPath) {
        programPath.traverse({
          ClassMethod: function ClassMethod(classMethodPath) {
            var componentName = classMethodPath.parentPath.parent.id.name;
            var methodName = classMethodPath.node.key.name;

            if (lifeCycleMethods.has(methodName)) {
              var tracerAST = buildTracerAST(types.stringLiteral(componentName), types.stringLiteral(methodName));
              classMethodPath.get("body").unshiftContainer("body", tracerAST);
            }
          }
        });
      }
    }
  };
}