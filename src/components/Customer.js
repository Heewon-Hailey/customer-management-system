import React from 'react';

// use props for input

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
}

export default Customer;