import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CustomerDelete from './CustomerDelete';

// use props for input

/*
class Customer extends React.Component{
    render(){
        return(
            <div>
                <CustomerProfile id = {this.props.id} img = {this.props.img} name = {this.props.name}/>
                <CustomerInfo DOB = {this.props.DOB} gender = {this.props.gender} job = {this.props.job} />
            </div>
        )
    }
}

class CustomerProfile extends React.Component{
    render(){
        return (
            <div>
                <img src = {this.props.img} alt = 'profile'/>
                <h2>{this.props.name}({this.props.id})</h2>
            </div>
        )
    }
}

class CustomerInfo extends React.Component{
    render(){
        return(
            <div>
                <p>{this.props.DOB}</p>
                <p>{this.props.gender}</p>
                <p>{this.props.job}</p>
            </div>
        )
    }
} */


class Customer extends React.Component{
    render(){
        return(
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell><img src={this.props.img} alt = 'profile'></img></TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.DOB}</TableCell>
                <TableCell>{this.props.gender}</TableCell>
                <TableCell>{this.props.job}</TableCell>
                <TableCell><CustomerDelete stateRefresh = {this.props.stateRefresh} id = {this.props.id}/></TableCell>
            </TableRow>
        )
    }
}


export default Customer;