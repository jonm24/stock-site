/* eslint-disable no-useless-computed-key */
import React from 'react';
import '../styles/App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Typography, makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core';
import Dashboard from './pages/Dashboard';
import HowItWorks from './pages/HowItWorks';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Login from './pages/Login';
import Register from './pages/Register';
import ScrollToTop from './utils/ScrollToTop';
import logo from '../assets/finsigs-logo.png';

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
        <div className="header">
          <Link to="/" className={classes.titlelink}>
            <img src={logo} alt="finsigs logo"></img>
          </Link>
          <div className="menu-container">
            <div className="navbox">
              <Link to="/" className="item">
                <Typography className={classes.navText}>Home</Typography>
                <div className="loader"></div>
              </Link>
              <Link to='/how-it-works' className="item">
                <Typography className={classes.navText}>How it Works</Typography>
                <div className="loader"></div>
              </Link>
              <Link to='/contact' className="item">
                <Typography className={classes.navText}>Contact</Typography>
                <div className="loader"></div>
              </Link>
              {/* <Link to='/blog' className="item">
                <Typography className={classes.navText}>Blog</Typography>
                <div className="loader"></div>
              </Link> */}
            </div>
          </div>
        </div>

        <Switch>
          <Route exact path='/' component={Dashboard}></Route>
          <Route path='/how-it-works' component={HowItWorks}></Route>
          <Route path='/contact' component={Contact}></Route>
          {/* <Route path='/blog' component={Blog}></Route> */}
          {/* <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route> */}
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
              style={{color: 'rgb(97,97,97)', marginLeft: '5px', fontWeight: '400', fontSize: '14px'}}>
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
  navText: {
    margin: '0px',
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: '.78rem',
    ['@media(min-width: 450px)']: {
      fontSize: '.93rem',
    },
    color: 'white',
  },
  btn: {
    marginLeft: '10px'
  },
  linkstyle: {
    textDecoration: 'none'
  },
  titlelink: {
    gridColumn: '2/3',
    gridRow: '2/3',
    ['@media(max-width: 1100px)']: {
      marginTop: '25px',
      marginBottom: '20px'
    },
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