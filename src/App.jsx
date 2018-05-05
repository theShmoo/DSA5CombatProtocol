import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";
import CombatProtocol from "./combat-protocol";
import './styles/main.css';

export default class App extends Component {

  render() {
    return (
      <div id="app">
        <Jumbotron>
          <h1>DSA 5 Combat Protocol</h1>
        </Jumbotron>
        <CombatProtocol />
        <footer className="container-fluid text-center">
          <p>Website von <strong>David Pfahler</strong></p>
          <p>Anregungen und Probleme bitte <a href="https://github.com/theShmoo/DSA5CombatProtocol/issues">hier</a> melden.</p>
        </footer>
      </div>
    );
  }
}
