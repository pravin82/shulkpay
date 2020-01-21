import React from "react";
import loginImg from "../../login.svg";
import axios from "axios";
import constantUtils from "../../constant.js";

export class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLogin() {
    let url = constantUtils.baseUrl;
    axios.post(url + "/user/login").then(response => console.log(response));
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={this.handleLogin}>
            Login
          </button>
        </div>
      </div>
    );
  }
}
