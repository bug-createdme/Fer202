import { Component } from "react";
import "./Navigation.css";

export class Navigation extends Component {
  render() {
    return (
      <nav className="navbar">
        <ul>
          <li>
            <a href="#hơme">Home</a>
          </li>

          <li>
            <a href="#news">News</a>
          </li>

          <li>
            <a href="#about">About</a>
          </li>
          
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navigation;
