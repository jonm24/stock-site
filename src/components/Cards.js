import React from 'react';
import '../styles/App.css';
import MiniChart from './widgets/MiniChart';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default function Cards(props) {
  const classes = useStyles();

  return (
    <Grid className={classes.gridtainer} container justify="center" spacing={2}>
      {props.tickers.map((value) => (
        <MiniChart 
          key={value}
          ticker={value}
        />
      ))}
    </Grid>
  );
}

const useStyles = makeStyles(() => ({
  gridtainer: {
    width: '98%',
    marginBottom: '10px'
  },
}));