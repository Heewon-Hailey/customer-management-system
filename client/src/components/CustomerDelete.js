import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent'; // input boxes
import Button from '@material-ui/core/Button'; 
import Typography from '@material-ui/core/Typography';

//delete info component

class CustomerDelete extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            open: false // whether the modal window is open
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClickClose = () => {
        this.setState({
            open: false
        })
    }

    deleteCustomer(id) {
        const url = '/api/customers/' + id; //access to the specific user info path
        fetch(url, {
            method: 'DELETE'  // REST API, only if DELETE method applied, proceed it
        });
        this.props.stateRefresh(); // refresh the partial page
    }
    
    render() {
        return(
            <div>
            <Button variant = "contained" color = "secondary" onClick = {this.handleClickOpen}>DELETE</Button>
            <Dialog open = {this.state.open} onClose = {this.handleClickClose}>
                <DialogTitle onClose = {this.handleClose}>
                    DELETE WARNING!
                </DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        The selected customer's details will be deleted.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant = "contained" color = "primary" onClick = {(e) => {this.deleteCustomer(this.props.id)}}>DELETE</Button>
                    <Button variant = "outlined" color = "primary" onClick = {this.handleClickClose}>CLOSE</Button>
                </DialogActions>
            </Dialog>
            </div>
        )
    }
}

export default CustomerDelete;
