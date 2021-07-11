import React, { Component } from 'react';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import DashBoard from "./Components/dashboard";

export default class App extends Component {
  render() {
    return (
      <div>
        <DashBoard/>
      </div>
    )
  }
}

