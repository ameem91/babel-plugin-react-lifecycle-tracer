import React, { Component } from "react";

class Clock extends Component {
  constructor(props) {
    window.postMessage({
      name: "__REACT_LIFECYCLE_TRACER_EVENT__",
      playload: {
        component: "Clock",
        method: "constructor"
      }
    }, "*");
    super(props);
    this.state = {
      date: new Date()
    };
  }

  componentDidMount() {
    window.postMessage({
      name: "__REACT_LIFECYCLE_TRACER_EVENT__",
      playload: {
        component: "Clock",
        method: "componentDidMount"
      }
    }, "*");
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    window.postMessage({
      name: "__REACT_LIFECYCLE_TRACER_EVENT__",
      playload: {
        component: "Clock",
        method: "componentWillUnmount"
      }
    }, "*");
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    window.postMessage({
      name: "__REACT_LIFECYCLE_TRACER_EVENT__",
      playload: {
        component: "Clock",
        method: "render"
      }
    }, "*");
    return React.createElement("div", null, React.createElement("h1", null, "Hello, world!"), React.createElement("h2", null, "It is ", this.state.date.toLocaleTimeString(), "."));
  }

}

export default Clock;