import React from "react";
import axios from "axios";
import "./StudentPage.scss";
import Input from '@material-ui/core/Input';

export class StudentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      }
    };
  }




render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Add Student</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <Input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name"
                type="text"
                name="firstName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
              <div className="middleName">
              <Input
                placeholder="Middle Name"
                type="text"
                name="middleName"
                noValidate
                onChange={this.handleChange}
              />
            </div>
            <div className="lastName">
              <Input
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                type="text"
                name="lastName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
            <div>
            <Input 
              placeholder = 'Roll No'
              required = "true"
              name = "RollNo"
              type = "number"
              onChange = {this.handleChange}
              />
              </div>

           
            <div className="createAccount">
              <button type="submit">Create Account</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
