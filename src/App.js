// examples : https://material-ui.com/demos/tables/ 

import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/styles'; // to use CSS

const styles = theme => ({
  root: {        //style for root
    width: '100%',
    marginTop: theme.spacing.unit *3,
    overflowX: "auto"
  },

  table :{
     minWidth: 1080  //fixed min width, when the window size is smaller, scrollbar will be shown
  }

})


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
    const { classes } = this.props;
    return (
      <Paper className = {classes.root} > 
          <Table className = {classes.table}>
            <TableHead>
              <TableRow>
                <TableCell> No. </TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>DOB</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Job</TableCell>
              </TableRow>
            </TableHead>
          
            <TableBody>
          {customers.map(c => {
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
            )})
          }
          </TableBody>
          </Table>
      </Paper>
    );
  }

}

export default withStyles(styles)(App);
//export App with the styles 
