import React from 'react';
import SearchBar from 'material-ui-search-bar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import {withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import axios from "axios";
import "../index.css"
import "./HomePage.scss";
import constantUtils from "../constant.js";
import {StudentDetailPage} from "../StudentPage/StudentDetailPage"


const url = constantUtils.baseUrl;


const StyledFormControl= withStyles({
  root: {
    minWidth:"120px"
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


class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          classOpen:false,
          studentClass:null,
          searchPhrase:null,
          results:[]
        }
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleAddStudent = this.handleAddStudent.bind(this);
        this.handleStudentDetail = this.handleStudentDetail.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);



    }

    componentDidMount() {
       this.setState(JSON.parse(localStorage.getItem('user')))
       
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
        if(!studentClass){
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
            <div className="parent">
            <div className = "school">
            <h1> {JSON.parse(localStorage.getItem('user')).school_name}</h1>
            </div>
            <div className="button-container"> 
            <Button variant="contained" color = 'primary'  onClick={this.handleAddStudent} >
            Add Student
            </Button>
            </div>
              <div className = "search-section">
               <StyledFormControl >
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
               <MuiThemeProvider>
               <SearchBar 
                name = "searchPhrase"
                onChange={this.handleSearchChange}
                onRequestSearch={this.handleSearch}
                style={{
                   width:800,
                   marginLeft:100
                }}
               />
               </MuiThemeProvider>
               </div>
               <div className = 'students'>
               <Result thisR={this}  />
               </div>
            </div>
            <div className = 'btn-logout'>
             <Button variant="outlined" color = 'primary'  onClick={this.handleLogOut} >
              Logout
             </Button>
            </div>
            <div className = 'btn-due'>
             <Button variant="contained" 
                    onClick={this.handleClassDue} 
                    style = {{
                       backgroundColor:"#FF4500",
                       color:"#ffffff"    
                    }} >
             Add Class Due
            </Button> 
            </div>
            </div>        
            
        );
    }
}

export { HomePage };