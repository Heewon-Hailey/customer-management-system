// examples : https://material-ui.com/demos/tables/ 

import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress'; 
import { withStyles } from '@material-ui/core/styles'; 

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { alpha } from '@material-ui/core/styles'; 


//fixed min width, when the window size is smaller, scrollbar will be shown

const styles = theme => ({
  root: {        
    width: '100%',
    minWidth: 1080 
    // overflowX: "auto" //scroll bar
  }, 
  menu: {
    marginTop: 15,
    marginBottom:15,
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    marginLeft: 15,
    marginRight: 15
  },
  progress :{
    marginTop: theme.spacing(2)
  },
  grow: {
    flexGrow:1
  },
  tableHead: {
    fontSize:'1.0rem'
  },
  menuButton:{
    marginLeft: -12,
    marginRight: 20
  },
  title:{
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display : 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width:200
      }
    }
  }
})

/*
- constructor() -> conponentWillMount() -> render() -> componentDidMount()
- only if props or state changes => shouldComponentUpdate(); call render() */

class App extends Component {
  // // fetch customer data which is changeable, so use 'state' not 'props'
  // state = { customers : "", completed: 0 }

  // re-load states
  constructor(props) {
    super(props);
    this.state = {
      customers: '',
      completed: 0,
      searchKeyword: '' // if not initialise this, the page doesn't show any list at the first time due to filtering out all  
    }
  }

  stateRefresh = () => {
    this.setState({
      customers : '',
      completed: 0,
      searchKeyword: ''   
    });
    // reload the new customer details
    this.callApi()  
    .then(res => this.setState({customers: res}))
    .catch(err => console.log(err));
  }

  // call api server after component mounting is done
  // .then input ('=>') the return data ('res') into customers
  // .catch errors ('err') then print ('=>') in console log (console.log(-))
  componentDidMount() {
    this.timer = setInterval(this.progress, 20); //run progress fn every 0.02 sec
    this.callApi()  
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }
   
  // asyn! fetch data and set the contents as json in body
  callApi = async () => { 
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({completed : completed >= 100 ? 0 : completed + 1});
  }

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  render(){
    // for filter option
    const filteredComponents = (data) => {
      data = data.filter((c) => {   // return only if the following condition is true
        return c.name.indexOf(this.state.searchKeyword) > -1; // check if the name includes the search key word
      });
      return data.map((c) => {
        return <Customer stateRefresh = {this.stateRefresh} key ={c.id} id = {c.id}
          img = {c.img} name = {c.name} DOB = {c.DOB} gender = {c.gender} job = {c.job} />
      });
    }
    const { classes } = this.props;
    const cellList = ["No","Image","Name","Date Of Birth","Gender","Job","Setting"]; // efficient way
    return (
      <div className = {classes.root}>
        <AppBar position = "static">
        <Toolbar>
          <IconButton className = {classes.menuButton} color = "inherit" aria-label='Open drawer'>
            <MenuIcon />
          </IconButton>
          <Typography className = {classes.title} variant = "h6" color = "inherit" noWrap>
            CUSTOMER MANAGEMENT SYSTEM
          </Typography>
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder= "Search.."
              classes = {{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              name = "searchKeyword"  // a word for searching
              value = {this.state.searchKeyword}
              onChange = {this.handleValueChange} 
            />
          </div>
        </Toolbar>
        </AppBar>
        <div className = {classes.menu}>
          <CustomerAdd stateRefresh = {this.stateRefresh}/>
        </div>
        <Paper className = {classes.paper}> 
          <Table className = {classes.table}>
            <TableHead>
              <TableRow>
                {cellList.map(c => {
                  return <TableCell className = {classes.tableHead}>{c}</TableCell>
                })}
                {/* <TableCell> No. </TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>DOB</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Job</TableCell>
                <TableCell>Setting</TableCell> */}
              </TableRow>
            </TableHead>
          
            <TableBody>
              {this.state.customers ? // if customer info exists return it, else show the progress circle image
                filteredComponents(this.state.customers) :
            //   {/* //return all customer w/o filter option */}
            //   {this.state.customers? this.state.customers.map(c => { 
            //     return ( <Customer
            //       stateRefresh = {this.stateRefresh} // fn of parent to child
            //       key = {c.id}    // in map, put unique 'key' props to identify element
            //       id = {c.id} img = {c.img} DOB = {c.DOB} name = {c.name} gender = {c.gender} job = {c.job}/>
            // )}) :
              <TableRow>
                <TableCell colSpan = '6' align = 'center'>
                  <CircularProgress className = {classes.progress} variant = 'determinate' value = {this.state.completed} /> 
                </TableCell>
              </TableRow>
              }
          </TableBody>
          </Table>
        </Paper>
      </div>
      //set props as the function 'stateRefresh'
    );
  }

}

export default withStyles(styles)(App);
//export App with the styles 
