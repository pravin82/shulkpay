import React from "react";
import axios from "axios";
import "./StudentDetailPage.scss";
import constantUtils from "../constant.js";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


const url = constantUtils.baseUrl;

const StyledFormGroup= withStyles({
  root: {
    flexDirection:"row"
  }
})(FormControl);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



export class StudentDetailPage extends React.Component {
	constructor(props) {
       super(props);
       this.state = {
        feeOpen: false,
        amount:null,
        mop:null,
        barOpen:false
       }

      this.handleFeeOpen= this.handleFeeOpen.bind(this);
      this.handleFeeClose= this.handleFeeClose.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleFeePay = this.handleFeePay.bind(this);


      


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

    handleChange(e) {
        const { name, value } = e.target;
        console.log("name+++", name)
        console.log("value+++", value)
        this.setState({ [name]: value });
    }

  
    handleFeeOpen() {
      this.setState({feeOpen:true})
    }
    handleFeeClose() {
      this.setState({feeOpen:false})
    }
    

    handleFeePay(e) {
      const {amount, mop} = this.state
      console.log("mop+++", mop)
      console.log("typeOf+++", typeof amount)
      const studentId = this.studentObj.id
      let values = {amount: amount, mop: mop, studentId:studentId}                       
      
      axios.post(url + "/fee/payFee", values)
      .then(response => {
        if (response.data.status == 'error') alert(response.data.msg)
        else {
           this.setState({barOpen:true})
           this.handleFeeClose()
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
            <div className = "button">
            <Button variant="contained" 
                    onClick={this.handleAddDue}
                    style = {{
                        backgroundColor:"#FF4500"
                    }}
            >
              Add Due
             </Button>
              <Button variant="contained" 
                     onClick={this.handleFeeOpen}
                      style = {{
                        backgroundColor:"#85bf31"
                    }}

                      >
              Pay Fee
             </Button>
            
             <Dialog open={this.state.feeOpen} 
                    onClose={this.handleFeeClose}
                    aria-labelledby="form-dialog-title"
                    fullWidth = "true"
                    

               >
             <DialogTitle id="form-dialog-title">Pay Fee</DialogTitle>
            <DialogContent>
            <div className = "form-fee">
           <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Amount"
            type="number"
            onChange={this.handleChange}
            name = "amount"
           />
           <FormControl component="fieldset" >
           <FormLabel component="legend">MOP</FormLabel>
           <RadioGroup aria-label="MOP" name="mop" 
                      value={this.state.value} 
                      onChange={this.handleChange}
                      style = {{
                        flexDirection: "row"
                      }} >
          <FormControlLabel value="CASH" control={<Radio />} label="CASH" />
          <FormControlLabel value="ONLINE" control={<Radio />} label="ONLINE" />

        </RadioGroup>
      </FormControl>
 
            </div>
         </DialogContent>
         <DialogActions>
          <Button onClick={this.handleFeeClose} color="primary">
            Cancel
          </Button>
          <div style = {{
               marginLeft:80
          }}>
              <Button onClick={this.handleFeePay}
                  style = {{
                        backgroundColor:"#85bf31"
                        
                    }}
          >
            Pay Fee
          </Button>
          </div>
        </DialogActions>
         { this.state.barOpen && (
         <Snackbar open={this.state.barOpen} autoHideDuration={6000} >
         <Alert  severity="success" >
          Student added Successfuly!
        </Alert>
        </Snackbar>
        )}
        </Dialog>
    

            </div>
            </div>
    		

    	)
    }
	
}