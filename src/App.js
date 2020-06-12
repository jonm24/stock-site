import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import './App.css';
import Dashboard from './Dashboard';

const useStyles = makeStyles({
  base: {
    color: 'white',
    fontWeight: '500', 
    paddingTop: '25px'
  }
});

export default function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <Typography className={classes.base} variant="h1">StockDeck</Typography>
      <Dashboard></Dashboard>
    </div>
  );
}