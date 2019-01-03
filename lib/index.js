"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _template = _interopRequireDefault(require("@babel/template"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lifeCycleMethods = new Set(["constructor", "componentDidMount", "componentDidUpdate", "componentWillUnmount", "shouldComponentUpdate", "getDerivedStateFromProps", "getSnapshotBeforeUpdate", "componentDidCatch", "render"]);
var tracerTemplate = (0, _template.default)("\n  window.postMessage({\n    name: \"__REACT_LIFECYCLE_TRACER_EVENT__\",\n    playload: {\n      component: COMPONENT,\n      method: METHOD\n    }\n  }, \"*\")\n", {
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
      ClassMethod: function ClassMethod(path) {
        var componentName = path.parentPath.parent.id.name;
        var methodName = path.node.key.name;

        if (lifeCycleMethods.has(methodName)) {
          var tracerAST = buildTracerAST(types.stringLiteral(componentName), types.stringLiteral(methodName));
          path.get("body").unshiftContainer("body", tracerAST);
        }
      }
    }
  };
}