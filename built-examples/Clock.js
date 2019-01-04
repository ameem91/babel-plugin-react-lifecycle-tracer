"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Clock =
/*#__PURE__*/
function (_Component) {
  _inherits(Clock, _Component);

  function Clock(props) {
    var _this;

    _classCallCheck(this, Clock);

    if (typeof window !== 'undefined') {
      window.postMessage({
        name: "__REACT_LIFECYCLE_TRACER_EVENT__",
        payload: {
          component: "Clock",
          method: "constructor",
          state: _this.state,
          props: _this.props
        }
      }, "*");
    }

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Clock).call(this, props));
    _this.state = {
      date: new Date()
    };
    return _this;
  }

  _createClass(Clock, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (typeof window !== 'undefined') {
        window.postMessage({
          name: "__REACT_LIFECYCLE_TRACER_EVENT__",
          payload: {
            component: "Clock",
            method: "componentDidMount",
            state: this.state,
            props: this.props
          }
        }, "*");
      }

      this.timerID = setInterval(function () {
        return _this2.tick();
      }, 1000);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (typeof window !== 'undefined') {
        window.postMessage({
          name: "__REACT_LIFECYCLE_TRACER_EVENT__",
          payload: {
            component: "Clock",
            method: "componentWillUnmount",
            state: this.state,
            props: this.props
          }
        }, "*");
      }

      clearInterval(this.timerID);
    }
  }, {
    key: "tick",
    value: function tick() {
      this.setState({
        date: new Date()
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (typeof window !== 'undefined') {
        window.postMessage({
          name: "__REACT_LIFECYCLE_TRACER_EVENT__",
          payload: {
            component: "Clock",
            method: "render",
            state: this.state,
            props: this.props
          }
        }, "*");
      }

      return _react.default.createElement("div", null, _react.default.createElement("h1", null, "Hello, world!"), _react.default.createElement("h2", null, "It is ", this.state.date.toLocaleTimeString(), "."));
    }
  }]);

  return Clock;
}(_react.Component);

var _default = Clock;
exports.default = _default;