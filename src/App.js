import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';

const customers = [
  {
    'id': 1,
    'img': 'https://placeimg.com/64/64/any/1',
    'name' : "Bob",
    'DOB' : "25/11/1998",
    'gender' : "Male",
    'job' : "Designer"
  },  
  {
    'id': 2,
    'img': 'https://placeimg.com/64/64/any/2',
    'name' : "Jane",
    'DOB' : "07/10/1965",
    'gender' : "Female",
    'job' : "Professor"
  },
  {
    'id': 1,
    'img': 'https://placeimg.com/64/64/any/3',
    'name' : "Hailey",
    'DOB' : "06/08/1993",
    'gender' : "Female",
    'job' : "Machine Learning Engineer"
  }
]
class App extends Component {
  render(){
    return (
      <div>
        { customers.map(c => {
            return (
            <Customer
              key = {c.id}    // in map, put unique 'key' props to identify element
              id = {c.id}
              img = {c.img}
              DOB = {c.DOB}
              name = {c.name}
              gender = {c.gender}
              job = {c.job}
              />
            )})}
      </div>
    );
  }

}

export default App;
