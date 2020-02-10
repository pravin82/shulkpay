import React from "react";
import axios from "axios";
import "./StudentDetailPage.scss";
import constantUtils from "../constant.js";


const url = constantUtils.baseUrl;



export class StudentDetailPage extends React.Component {
	constructor(props) {
       super(props);
       this.state = {
      
       }
    }
    studentObj = this.props.location.state.studentObj

    componentDidMount() {
        axios.get(url + "/student/studentDetail/?studentId=" + this.studentObj.id)
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
            <div>
            <h1> {this.studentObj.name}</h1>
            </div>
            <div className = "detail">
            <h2> Roll No : {this.studentObj.roll_no} </h2>
            <h2> Class: {this.studentObj.class} </h2>
            <h2> Section : {this.studentObj.section}</h2>
            </div>
            </div>
    		

    	)
    }
	
}