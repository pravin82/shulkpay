import React from "react";
import loginImg from "../login.svg";
import axios from "axios";
import constantUtils from "../constant.js";
const url = constantUtils.baseUrl;

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    username: '',
    password: '',
    submitted: false,
    loading: false,
    error: ''
  };

  this.handleChange = this.handleChange.bind(this);
  this.handleLogin = this.handleLogin.bind(this);

  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  
  handleLogin() {
    let {username, password} = this.state
    let values = {username: username,
                  password: password}
    axios.post(url + "/user/login", values)
    .then(response => {
      if(response.data.status == 'error') alert(response.data.msg)
      else if(response.data.status == 'success'){
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        this.props.history.push(from);  
      }

    })
    
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
              <input type="text" name="username" placeholder="username" id = "username"  onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" id = "password" onChange={this.handleChange}/>
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
