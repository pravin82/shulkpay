import React from 'react';
import SearchBar from 'material-ui-search-bar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import {withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

import "../index.css"
import "./HomePage.scss";

const StyledFormControl= withStyles({
  root: {
    minWidth:"120px"
  }
})(FormControl);


class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          classOpen:false
        }
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleAddStudent = this.handleAddStudent.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }

    componentDidMount() {
       this.setState(JSON.parse(localStorage.getItem('user')))
       
    }
    handleLogOut(e) {
        localStorage.removeItem('user');
        this.props.history.push('/login');  
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

    render() {
    
        return (
            
            <div className="parent">
            <div className = "school">
            <h1> {JSON.parse(localStorage.getItem('user')).school_name}</h1>
            </div>
            <div className="button-container"> 
                <h2>Hi  {JSON.parse(localStorage.getItem('user')).name}</h2>
            <Button variant="contained" color = 'primary' className = 'btn-student' onClick={this.handleAddStudent} >
            Add Student
            </Button>
                 
            <Button variant="contained" color = 'primary' className = 'btn-logout' onClick={this.handleLogOut} >
            Logout
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
                value={this.state.class}
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
                onChange={() => console.log('onChange')}
                onRequestSearch={() => console.log('onRequestSearch')}
                style={{
                   width:800,
                   marginLeft:100
                }}
               />
               </MuiThemeProvider>
               </div>
            </div>

        );
    }
}

export { HomePage };