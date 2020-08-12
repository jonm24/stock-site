import React from 'react';
import '../styles/App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Typography, makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core';
import Dashboard from './pages/Dashboard';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Login from './pages/Login';
import Register from './pages/Register';
import Tape from './widgets/Tape';
import ScrollToTop from './utils/ScrollToTop';
import logo from '../assets/whitelogowebsite.png';

export default function App() {
  const classes = useStyles();

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
      <ScrollToTop>
      <ThemeProvider theme={theme}>
      <div className="App">
        <Link to="/" className={classes.titlelink}>
          <img src={logo} style={{marginTop: '25px'}} alt="finsigs logo"></img>
        </Link>
        <div className="under-title">
          <div></div>
          <Typography className={classes.lower} variant="h5">
            Stay up-to-date with your most loved stocks
          </Typography>
          <Tape />
        </div>

        <Switch>
          <Route exact path='/' component={Dashboard}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/terms" component={Terms}></Route>
          <Route path="/privacy" component={Privacy}></Route>
        </Switch>

        <div className="footer">
          <div style={{
              display: 'flex', 
              flexDirection: 'row', 
              alignItems: 'center'}}>
            <a 
              className={classes.footerlink}
              href="https://www.tradingview.com/"
              target="_blank" 
              rel="noopener noreferrer">
              All charts and price data
            </a>
            <Typography
              className={classes.footerlink}
              style={{marginLeft: '5px', fontWeight: '400', fontSize: '12px'}}>
            provided by TradingView</Typography>
          </div>
          <div style={{marginTop: '10px'}}>
            <Link to="/terms" 
              style={{marginRight: "5px"}} 
              className={classes.footerlink}>
            Terms of Service</Link> 
            |
            <Link to="/privacy" 
              style={{marginLeft: "5px"}}
              className={classes.footerlink}>
            Privacy Policy</Link>
          </div>
        </div>
      </div>
      </ThemeProvider>
      </ScrollToTop>
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
  },
  footerlink: {
    color: 'rgb(97, 97, 97)', 
    '&:link':{
      color: 'rgb(97, 97, 97)'
    },
    '&:visited': {
      color: 'rgb(97, 97, 97)'
    },
    '&:active': {
      color: 'rgb(97, 97, 97)'
    },
    '&:hover': {
      color: 'green'
    }
  }
});