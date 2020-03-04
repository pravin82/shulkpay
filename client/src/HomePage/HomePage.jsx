import React from 'react';
import SearchBar from 'material-ui-search-bar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import {withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import axios from "axios";
import "../index.css"
import "./HomePage.scss";
import constantUtils from "../constant.js";
import {StudentDetailPage} from "../StudentPage/StudentDetailPage"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import  DropDown  from '../components/DropDown';
import  TemporaryDrawer from '../components/Drawer';




const url = constantUtils.baseUrl;


const StyledFormControl= withStyles({
  root: {
    minWidth:"120px",
  }
})(FormControl);







const Result = ({thisR}) => {
  return thisR.state.results.map(r => (
    <div className = "student"
         onClick = {() => thisR.handleStudentDetail(r)}
    >
    <div className = "student-name"> Name :  {r.name}</div>
    <div className = "student-section">Section : {r.section}</div>
    <div>Roll No: {r.roll_no}</div>
    </div>

   ))

}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function DueModal(props) {
  return <Dialog 
            open={true} 
            onClose={props.this.handleDueClose}
            aria-labelledby="form-dialog-title"
            fullWidth = "true"
          >
          <DialogTitle id="form-dialog-title">Add Due</DialogTitle>
          <DialogContent>
          <div className = "form-fee">
          <StyledFormControl >
          <DropDown handler = {props.this.handleChange} dueClass = {true}/>
          
          </StyledFormControl>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Amount"
            type="number"
            onChange={props.this.handleChange}
            name = "amount"
            variant = "outlined"
           />
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Remarks"
            type="text"
            onChange={props.this.handleChange}
            name = "remarks"
            variant = "outlined"
           />
          
            </div>
            </DialogContent>
            <DialogActions>
            <Button onClick={props.this.handleDueClose} color="primary">
            Cancel
            </Button>
            <div style = {{
               marginLeft:80
            }}>
            <Button 
              onClick={props.this.handleClassDue}
              style = {{
                backgroundColor:"#FF4500"     
                }}
            >
            Add Due
            </Button>
            </div>
            </DialogActions>
            </Dialog>

}


class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          classOpen:false,
          studentClass:null,
          dueClass:null,
          searchPhrase:null,
          dueOpen:false,
          dueBarOpen:false,
          amount:null,
          remarks:null,
          results:[],
          labelWidth:0
        }
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleAddStudent = this.handleAddStudent.bind(this);
        this.handleStudentDetail = this.handleStudentDetail.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDueOpen= this.handleDueOpen.bind(this);
        this.handleDueClose= this.handleDueClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleClassDue  = this.handleClassDue.bind(this);
    }

    componentDidMount() {
      let userId = JSON.parse(localStorage.getItem('user')).id
      axios.get(url + "/user/loginStatus/?userId=" + userId)
      .then(response => {
          if (response.data.status == 'error') alert(response.data.msg)
          else {
              if (response.data.loginStatus == 1) {
                this.setState(JSON.parse(localStorage.getItem('user')))
              }
              else {
                localStorage.removeItem('user');
                this.props.history.push('/login'); 
              }    
          }    
      })  
    }
    handleLogOut(e) {
        localStorage.removeItem('user');
        this.props.history.push('/login');  
    }
    handleStudentDetail(r) {
       this.props.history.push({
          pathname: '/student/' + r.id,
          state: { studentObj: r }
      })

    }
    
    handleAddStudent(e) {
        this.props.history.push('/student'); 
    }
    handleDueOpen() {
      this.setState({dueOpen:true})
    }

    handleDueClose() {
      this.setState({dueOpen:false})
    }

    handleClassDue(e) {
      const {amount, remarks} = this.state
      const studentClass = this.state.dueClass
      let values = {amount: -amount, mop: remarks, studentClass:studentClass}                       
      
      axios.post(url + "/fee/classDue", values)
      .then(response => {
        if (response.data.status == 'error') alert(response.data.msg)
        else {
           this.setState({dueBarOpen:true})
           this.handleDueClose()
        }    
      })    

    }

    handleDueBarClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
    this.setState({dueBarOpen:false})
    }

    handleOpen(e) {
        this.setState({classOpen:true}) 
    }
    handleClose(e) {
        this.setState({classOpen:false}) 
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleSearchChange(searchPhrase){
        this.setState({searchPhrase:searchPhrase})
    }
    handleSearch(e){
        let {studentClass, searchPhrase} = this.state
        console.log("studentClass+++", studentClass)
        if(!studentClass){
          console.log("Not studnetClass++++")
          return
        }
        axios.get(url + "/student/studentSearch/?studentClass=" + studentClass + "&searchPhrase=" + searchPhrase)
        .then(response => {
            if (response.data.status == 'error') alert(response.data.msg)
            else {
                this.setState({results: response.data.data})
               
            }    
        })
    }    




    render() {

        return (

            <div>
            <div className = 'top-section'>
            <div>
            <Button variant="contained" 
                    onClick={this.handleClassDue} 
                    onClick={this.handleDueOpen}
                    style = {{
                      backgroundColor:"#FF4500",
                      color:"#ffffff"    
                    }} 
            >
            Add Class Due
            </Button> 
            </div>
            <div>
            <Button variant="outlined" 
                    color = 'primary'  
                    onClick={this.handleLogOut}
                    style = {{width:150}} >
            Logout
            </Button>
            </div> 
            </div>
            <div className = "school">
            <h1 className = "school-text"> {JSON.parse(localStorage.getItem('user')).school_name}</h1>
            </div>
            <div className="parent">
            <div className="button-container"> 
            <Button variant="contained"
                    color = 'primary' 
                    onClick={this.handleAddStudent}
                    style = {{left: "5%",
                              width: 150}}
             >
            Add Student
            </Button>
            </div>
            <div className = "search-section">
            <StyledFormControl variant = "outlined" >
            <DropDown handler = {this.handleChange}/>
            </StyledFormControl>
            <MuiThemeProvider>
            <div className = 'search-bar'>
            <SearchBar name = "searchPhrase"
                       onChange={this.handleSearchChange}
                       onRequestSearch={this.handleSearch}
            />
            </div>
            </MuiThemeProvider>
            </div>
            <div className = 'students'>
            <Result thisR={this}  />
            </div>
            </div>
            {this.state.dueOpen && (<DueModal this = {this}/>)}
            { this.state.dueBarOpen && (
            <Snackbar open={this.state.dueBarOpen} autoHideDuration={6000} onClose = {this.handleDueBarClose} >
            <Alert  severity="success" 
                    onClose = {this.handleDueBarClose} 
                    style = {{backgroundColor:'#FF4500'}}>
            Due Added Successfuly!
            </Alert>
            </Snackbar>
            )}
             <div className = "drawer">
            <TemporaryDrawer/>
            </div>
            </div>        
            
        );
    }
}


export default HomePage

