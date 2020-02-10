import React from "react";
import axios from "axios";
import "./StudentPage.scss";
import Input from '@material-ui/core/Input';
import Snackbar from '@material-ui/core/Snackbar';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import constantUtils from "../constant.js";
import MuiAlert from '@material-ui/lab/Alert';
const url = constantUtils.baseUrl;

axios.defaults.withCredentials = true;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const StyledFormControl= withStyles({
  root: {
    minWidth:"120px"
  }
})(FormControl);

export class StudentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      middleName:null,
      classOpen:false,
      secOpen:false,
      barOpen:false,
      rollNo: null,
      studentClass: null,
      studentSection: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleOpen(e) {
    const {name} = e.target;
    if(name == 'studentSection'){
      this.setState({secOpen: true})
    }
    else{
      this.setState({classOpen:true})
    } 
  }

  handleClose(e) {
    const {name} = e.target;
    if(name == 'studentSection'){
      this.setState({secOpen: false})
    }
    else{
      this.setState({classOpen:false})
    } 
  }

  handleBar(isOpen){
    if(isOpen){
      this.setState({barOpen:true})
    }
    else{
      this.setState({barOpen:false})
    }
  }

  handleSubmit(e) {
    
    let {firstName, middleName, lastName, studentClass, studentSection, rollNo} = this.state
    let name = firstName + " " + middleName + " " + lastName
    if(!middleName){
      name = firstName + " " + lastName
    }
    let values = {name: name,
                 studentClass: studentClass, studentSection:studentSection, rollNo:rollNo
                }
    axios.post(url + "/student/add", values)
    .then(response => {
      if (response.data.status == 'error') alert(response.data.msg)
      else {
        this.handleBar(true)
        const { from } = this.props.location.state || { from: { pathname: "/student" } };
        this.props.history.push(from);  
      }    

    })    
  }

  




render() {
    const { formErrors } = this.state;
   

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1 className ="add">Add Student</h1>
          <form onSubmit={this.handleSubmit} noValidate>
          <div className = "name">
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
            </div>
            <div className = "class">
            <Input 
              placeholder = 'Roll No'
              required = "true"
              name = "rollNo"
              type = "number"
              onChange = {this.handleChange}
              />

              <StyledFormControl className="formControl">
             <InputLabel id="demo-controlled-open-select-label">Class</InputLabel>
             <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={this.state.Classopen}
                name = "studentClass"
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                value={this.state.studentClass}
                onChange={this.handleChange}
              >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'NURSERY'}>Nursery</MenuItem>
            <MenuItem value={'LKG'}>LKG</MenuItem>
            <MenuItem value={'UKG'}>UKG</MenuItem>
            <MenuItem value={'1'}>1</MenuItem>
            <MenuItem value={'2'}>2</MenuItem>
            <MenuItem value={'3'}>3</MenuItem>
            <MenuItem value={'4'}>4</MenuItem>
            <MenuItem value={'5'}>5</MenuItem>
            <MenuItem value={'6'}>6</MenuItem>
            <MenuItem value={'7'}>7</MenuItem>
            <MenuItem value={'8'}>8</MenuItem>
            <MenuItem value={'9'}>9</MenuItem>
            <MenuItem value={'10'}>10</MenuItem>
            </Select>
      </StyledFormControl>

        <StyledFormControl classes = {{root:'formControl'}}>
             <InputLabel id="demo-controlled-open-select-label">Section</InputLabel>
             <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                name = "studentSection"
                open={this.state.SecOpen}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                value={this.state.studentSection}
                onChange={this.handleChange}
              >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'A'}>A</MenuItem>
            <MenuItem value={'B'}>B</MenuItem>
            <MenuItem value={'C'}>C</MenuItem>
            </Select>
      </StyledFormControl>
           
              </div>
              
             


           
            <div className="createAccount">
              <Button  variant="contained" color="primary"
                       name = "submit"
                       onClick = {this.handleSubmit}

              >
              Submit</Button>
            </div>
          </form>
        </div>
        { this.state.barOpen && (
         <Snackbar open={this.state.barOpen} autoHideDuration={6000} >
         <Alert  severity="success" >
          Student added Successfuly!
        </Alert>
      </Snackbar>
      )
        }
        
      </div>
    );
  }
}
