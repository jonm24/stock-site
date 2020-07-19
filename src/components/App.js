import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Typography, Button, makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core';
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';
import Tape from './widgets/Tape';
import '../styles/App.css';
import { useRealmApp } from '../realm/RealmApp';

export default function App(props) {
  const classes = useStyles();
  //const app = useRealmApp();


  /* login and register links
  <div>
    <Link to="/login" className={classes.linkstyle}>
      <Button variant="contained" size="medium"
        color="primary" className={classes.btn}>
      Login</Button>
    </Link>
    <Link to="/register" className={classes.linkstyle}>
      <Button variant="contained" size="medium"
        color="primary" className={classes.btn}>
      Register</Button>
    </Link>
  </div>
  */

  return (
    <Router>
      <ThemeProvider theme={theme}>
      <div className="App">
        <Link to="/" className={classes.titlelink}>
          <Typography className={classes.base} variant="h1">finsigs</Typography>
        </Link>
        <div className="under-title">
          <div></div>
          <Typography className={classes.lower} variant="h5">
            Stay up-to-date with you're most loved stocks
          </Typography>
          <Tape />
        </div>

        <Switch>
          <Route exact path='/' component={Dashboard}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
        </Switch>

        <div className="footer">Terms of Service | Contact</div>
      </div>
      </ThemeProvider>
    </Router>
  );
}
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
  },
});
const useStyles = makeStyles({
  base: {
    color: 'white',
    fontWeight: '500', 
    paddingTop: '10px',
    fontSize: '4rem'
  },
  lower: {
    color: 'white',
    fontWeight: '500',
    gridColumn: 3/4,
    fontSize: "1.25rem"
  }, 
  btn: {
    marginLeft: '10px'
  },
  linkstyle: {
    textDecoration: 'none'
  },
  titlelink: {
    '&:link':{
      color: 'white'
    },
    '&:visited': {
      color: 'white'
    },
    '&:active': {
      color: 'white'
    },
    '&:hover': {
      color: 'green'
    }
  }
});