import React from "react";
import axios from "axios";
import "./StudentDetailPage.scss";
import constantUtils from "../constant.js";


const url = constantUtils.baseUrl;



export class StudentDetailPage extends React.Component {
	constructor(props) {
       super(props);
       this.studentId= props.match.params.studentId;
       this.state = {
      
       }
    }

    componentDidMount() {
    	console.log("studentIdparamas++++", this.studentId)
        axios.get(url + "/student/studentDetail/?studentId=" + this.studentId)
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
    		Hi there
    		</div>

    	)
    }
	
}