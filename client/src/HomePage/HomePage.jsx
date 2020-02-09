import React from 'react';
import SearchBar from 'material-ui-search-bar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';
import "../index.css"
import "./HomePage.scss";



class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleAddStudent = this.handleAddStudent.bind(this);


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
               <MuiThemeProvider>
               <SearchBar className = "searchbar"
                onChange={() => console.log('onChange')}
                onRequestSearch={() => console.log('onRequestSearch')}
                style={{
                   margin: '0 auto',
                   maxWidth: 400
                }}
               />
               </MuiThemeProvider>
            </div>

        );
    }
}

export { HomePage };