import { Component } from "react";
import "./Footer.css";

export class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <p>Copyright &copy; 2024 by Hwink</p>
        <p>
          <a href="/privacy-policy">Privacy Policy</a> | 
          <a href="/terms-of-service">Terms of Service</a> | 
          <a href="/contact">Contact</a>
        </p>
      </div>
    );
  }
}

export default Footer;
