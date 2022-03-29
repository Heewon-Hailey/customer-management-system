import React from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent'; // input boxes
import TextField from '@material-ui/core/TextField'; 
import Button from '@material-ui/core/Button'; 
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    hidden :{
        display : 'none'
    }
})

// * efficient way to fetch and load data -> fetch more as you scroll down !!

class CustomerAdd extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            file: null,
            userName : '',
            DOB: '',
            gender: '',
            job : '',
            fileName: '',
            open : false // is dialog window open?
        }
    }

    // agr as event 'e'
    handleFormSubmit = (e) => {
        e.preventDefault()  // error handle
        // send the new data to DB
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();    // update the list part with new data
                // in asynchronous process, no guarantee the data will be refreshed after update is done
                // stateRefresh fn needs to be here right after getting the response of adding info
            })

        // reset the values 
        this.setState({
            file: null,
            userName : '',
            DOB: '',
            gender: '',
            job : '',
            fileName: '',
            open: false
        })
        
        // window.location.reload(); // reload the whole page for test 
    }

    // e.target : input value
    // only upload one file from files[0]
    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],  
            fileName: e.target.value
        })
    }

    // e.g., when name = 'job', apply the value to state.job
    // use nextState to update the current state
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer = () => {
        const url = '/api/customers';   // to send data to this url
        const formData = new FormData(); 
        formData.append('img', this.state.file);
        formData.append('name', this.state.name);
        formData.append('DOB', this.state.DOB);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        const config = {
            headers: {
                'content-type' : 'multipart/form-data'
            } 
        }
        // add standard header when you send data including file(s)

        return post(url, formData, config);
        //post from axios args(SendToURL, SendingData, Config Header)
    }

    // pop up customer detail add modal
    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClickClose = () => {
        this.setState({
            file: null,
            userName : '',
            DOB: '',
            gender: '',
            job : '',
            fileName: '',
            open: false
        })
    }


    render() {
        const { classes } = this.props; // to design initialise class variables
        return (
            <div>
                <Button variant = "contained" color = "primary" onClick = {this.handleClickOpen} >
                    ADD CUSTOMER DETAILS
                </Button> 
                <Dialog open = {this.state.open} onClose = {this.handleClose}>
                    <DialogTitle>ADD CUSTOMER DETAILS</DialogTitle>
                    <DialogContent>
                        <input className = {classes.hidden} accept = "image/*" id = "raised-button-file" type = "file" file = {this.state.file} value = {this.state.fileName} onChange = {this.handleFileChange}/><br/>
                        <label htmlFor = "raised-button-file">
                            <Button variant = "contained" color = "primary" component = "span" name = "file" >
                                {this.state.fileName === "" ? "Select Profile Image" : this.state.fileName}
                            </Button>
                        </label>
                        <br/>
                        <TextField label = "Name" type = "text" name = "userName" value = {this.state.userName} onChange = {this.handleValueChange}/><br/>
                        <TextField label = "DOB (DD/MM/YYYY)" type = "text" name = "DOB" value = {this.state.DOB} onChange = {this.handleValueChange}/><br/>
                        <TextField label = "Gender" type = "text" name = "gender" value = {this.state.gender} onChange = {this.handleValueChange}/><br/> 
                        <TextField label = "Job" type = "text" name = "job" value = {this.state.job} onChange = {this.handleValueChange}/><br/> 
                    </DialogContent>
                    <DialogActions>
                        <Button variant = "contained" color = "primary" onClick = {this.handleFormSubmit}>ADD</Button>
                        <Button variant = "outlined" color = "primary" onClick = {this.handleClickClose}>CLOSE</Button>
                    </DialogActions>
                </Dialog>
            </div>
            /*
            <form onSubmit = {this.handleFormSubmit}>
                <h1> Customer Details </h1>
                Profile Image: <input type = "file" name = "file" file = {this.state.file} value = {this.state.fileName} onChange = {this.handleFileChange}/><br/>
                Name: <input type = "text" name = "userName" value = {this.state.userName} onChange = {this.handleValueChange}/><br/>
                Date of Birth (DD/MM/YYYY): <input type = "text" name = "DOB" value = {this.state.DOB} onChange = {this.handleValueChange}/><br/>
                Gender: <input type = "text" name = "gender" value = {this.state.gender} onChange = {this.handleValueChange}/><br/> 
                Job: <input type = "text" name = "job" value = {this.state.job} onChange = {this.handleValueChange}/><br/> 
                <button type = "submit">ADD</button>
            </form>
            */
        )
    }
}

export default withStyles(styles)(CustomerAdd)    // to use it externally


