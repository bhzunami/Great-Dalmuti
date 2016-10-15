import React from 'react';
import { Navigation } from './Navigation';

const socket = io.connect();

export default React.createClass({

  getInitialState() {
    return { users: [], messages: [], text: '' };
  },

  componentDidMount() {
    socket.on('test', this._test);
    socket.emit("test", "bal")

  },

  _initialize() {
    socket.emit()

  },

  _test(data) {
    console.log("Data: ", data)
  },


  render() {
    return <div>
      <Navigation />

      <div className="container">

        <div className="starter-template">
          <h1>Bootstrap starter template</h1>
          <p className="lead">Use this document as a way to quickly start any new project.<br /> All you get is this text and a mostly barebones HTML document.</p>
        </div>

      </div>
    </div>
  }
});
