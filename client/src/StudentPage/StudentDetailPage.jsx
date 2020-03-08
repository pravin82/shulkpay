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
import Pagination from '@material-ui/lab/Pagination';
import TemporaryDrawer from '../components/Drawer';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';




const url = constantUtils.baseUrl;

const StyledFormGroup= withStyles({
  root: {
    flexDirection:"row"
  }
})(FormControl);

function formatDateTime(dateTime) {
  var dateUTC = new Date(dateTime);
  return((dateUTC.toString()).substring(0,10))  
}


const Transaction = ({thisR}) => {
  return thisR.state.results.slice((thisR.state.page - 1)*8, (thisR.state.page)*8).map(r => (
    <div className = {r.amount > 0 ? "transaction-fee": "transaction-due"}>
    <div className = "date" >  {formatDateTime(r.created_on)}</div>
    <div className = "amount">{Math.abs(r.amount)}</div>
    {r.remarks ? (<div>{r.remarks}</div>):<div>Nothing</div> }
    </div>

   ))
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function TotalDue(props) {
  return <h1 style = {{
                color:"#FF4500",
                fontWeight:'bold',
                marginTop:'0px'
             }}
  >
  Total Due:  {Math.abs(props.this.state.results[0].total_due)}</h1>
}

function TotalAdvance(props) {
   return <h1 style = {{
                color:"#85bf31",
                fontWeight:'bold',
                marginTop:'0px'
              }}
  >
  Total Advance:  {Math.abs(props.this.state.results[0].total_due)}</h1>
}

function FeeModal(props) {
  return <Dialog 
            open={true} 
            onClose={props.this.handleFeeClose}
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
            onChange={props.this.handleChange}
            name = "amount"
           />
           <FormControl component="fieldset" >
           <FormLabel component="legend">MOP</FormLabel>
           <RadioGroup
              aria-label="MOP" name="mop" 
              value={props.this.state.value} 
              onChange={props.this.handleChange}
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
            <Button onClick={props.this.handleFeeClose} color="primary">
            Cancel
            </Button>
            <div style = {{
               marginLeft:80
            }}>
            <Button 
              onClick={props.this.handleFeePay}
              style = {{
                backgroundColor:"#85bf31"     
                }}
            >
            Pay Fee
            </Button>
            </div>
            </DialogActions>
            </Dialog>
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
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Amount"
            type="number"
            onChange={props.this.handleChange}
            name = "amount"
           />
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Remarks"
            type="text"
            onChange={props.this.handleChange}
            name = "remarks"
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
              onClick={props.this.handleAddDue}
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




export class StudentDetailPage extends React.Component {
	constructor(props) {
       super(props);
       this.state = {
        feeOpen: false,
        amount:null,
        mop:null,
        feeBarOpen:false,
        dueBarOpen:false,
        dueOpen:false,
        remarks:null,
        results:[],
        studentObj:null,
        page:1
       }

      this.handleFeeOpen= this.handleFeeOpen.bind(this);
      this.handleFeeClose= this.handleFeeClose.bind(this);
      this.handleDueOpen= this.handleDueOpen.bind(this);
      this.handleDueClose= this.handleDueClose.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleFeePay = this.handleFeePay.bind(this);
      this.handleAddDue = this.handleAddDue.bind(this);
      this.handleHomeLink = this.handleHomeLink.bind(this);
      this.handlePaginationChange = this.handlePaginationChange.bind(this);
    }
    
    studentId = this.props.location.pathname.substring(9)
    
    componentDidMount() {
        this.transAPI()
        axios.get(url + "/student/studentDetail/?studentId=" + this.studentId)
        .then(response => {
            if (response.data.status == 'error') alert(response.data.msg)
            else {
                this.setState({studentObj: response.data.data[0]})     
            }    
        })  
    }

    transAPI(props) {
      axios.get(url + "/student/transDetail/?studentId=" + this.studentId)
      .then(response => {
        if (response.data.status == 'error') alert(response.data.msg)
        else {
          this.setState({results: response.data.data})
               
        }    
      })
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

  
    handleFeeOpen() {
      this.setState({feeOpen:true})
    }
    handleFeeClose() {
      this.setState({feeOpen:false})
    }
     handleDueOpen() {
      this.setState({dueOpen:true})
    }
    handleDueClose() {
      this.setState({dueOpen:false})
    }

    handleFeeBarClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
    this.setState({feeBarOpen:false})
    }

     handleDueBarClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
    this.setState({dueBarOpen:false})
    }
    

    handleFeePay(e) {
      const {amount, mop} = this.state
      const studentId = this.state.studentObj.id
      let values = {amount: amount, mop: mop, studentId:studentId}                       
      
      axios.post(url + "/fee/payFee", values)
      .then(response => {
        if (response.data.status == 'error') alert(response.data.msg)
        else {
           this.setState({feeBarOpen:true})
           this.handleFeeClose()
           this.transAPI()
        }    

      })    

    }

    handleAddDue(e) {
      const {amount, remarks} = this.state
      const studentId = this.state.studentObj.id
      let values = {amount: -amount, mop: remarks, studentId:studentId}                       
      
      axios.post(url + "/fee/payFee", values)
      .then(response => {
        if (response.data.status == 'error') alert(response.data.msg)
        else {
           this.setState({dueBarOpen:true})
           this.handleDueClose()
           this.transAPI()
        }    

      })    

    }

    handleHomeLink(e) {
     this.props.history.push('/'); 
    }

    handlePaginationChange(e, page) {
      this.setState({page:page})
    }


    render() {
     
    	return (
            <div>
             <div className = "home-link"
                  onClick = {this.handleHomeLink}
             >
            Shulkpay
            </div>
            {this.state.studentObj &&
              ( <div>
                <div className = "student-name-sd">
                <h1 style = {{fontWeight: ' bold'}}> {this.state.studentObj.name}</h1>
                </div>
                <div className = "detail">
                <h2 style = {{fontWeight: 'normal'}}> Roll No : {this.state.studentObj.roll_no} </h2>
                <h2 style = {{fontWeight: 'normal'}}> Class: {this.state.studentObj.class} </h2>
                <h2 style = {{fontWeight: 'normal'}}> Section : {this.state.studentObj.section}</h2>
                </div>
                <div  className = "detail-short">
                <h2 style = {{fontWeight: 'normal', textAlign:'center', marginBottom:'0px'}}> Roll No : {this.state.studentObj.roll_no} </h2>
                <div className = "class-detail">
                <h2 style = {{fontWeight: 'normal'}}>Class : {this.state.studentObj.class} </h2>
                <h2 style = {{fontWeight: 'normal'}}>Section : {this.state.studentObj.section}</h2>
                </div>
                </div>
                </div>
              )
            }
            <div>
            {(this.state.results[0] && this.state.results[0].total_due <= 0) && 
              (<TotalDue this = {this}/>)
            }
            {(this.state.results[0] && this.state.results[0].total_due > 0) && 
              (<TotalAdvance this = {this}/>)
            }
            </div>
            <div className = 'transactions'>
               <Transaction thisR={this}  />
            </div>
            <div className = "button">
            <Button variant="contained" 
                    onClick={this.handleDueOpen}
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
           
        {this.state.feeOpen && (<FeeModal this = {this}/>)}
        {this.state.dueOpen && (<DueModal this = {this}/>)}

        { this.state.feeBarOpen && (
         <Snackbar open={this.state.feeBarOpen} autoHideDuration={6000} onClose = {this.handleFeeBarClose} >
         <Alert  severity="success" onClose = {this.handleFeeBarClose} >
          Fees Paid Successfuly!
        </Alert>
        </Snackbar>
        )}
         { this.state.dueBarOpen && (
         <Snackbar open={this.state.dueBarOpen} autoHideDuration={6000} onClose = {this.handleDueBarClose} >
         <Alert  severity="success" 
                 onClose = {this.handleDueBarClose} 
                 style = {{backgroundColor:'#FF4500'}}>
          Due Added Successfuly!
        </Alert>
        </Snackbar>
        )}
    

        </div>
        <div className = {(this.state.results && this.state.results.length > 8) ? "pagination" : "pagination-hide" }>
        <Pagination count={10}
                    color="primary"
                    onChange = {this.handlePaginationChange}
       />
        </div>
        <div className = "buttons">
        <div>
        <IconButton style = {{padding:0,width:32,height:32}}
                    onClick = {this.handleHomeLink}
        >
        <HomeIcon style = {{fontSize:32}} />
        </IconButton>
        </div>
        <div>
        <TemporaryDrawer studentDetail = {true} 
                         handleDueOpen = {this.handleDueOpen}
                         handleFeeOpen = {this.handleFeeOpen}

        />
        </div>
        </div>
        </div>
    		

    	)
    }
	
}