import React from 'react';
import { Grid, Paper} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from './Card';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1, 
  }, 
  paper: {
    height: 350,
    width: 350,
    backgroundColor: "rgb(52, 52, 55)",
    borderRadius: "5%",
    color: "white",
  },
}));

export default function Cards(props) {
  const classes = useStyles();

  console.log(props.tickers)
  return (
    <div className="side-grid-container">
      <Grid container justify="center" spacing={2}>
        {props.tickers.map((value, index) => (
          <Grid key={index} item>
            <Paper elevation={9} className={classes.paper}>
              {value !== '' ? 
                <Card chartData={props.chartData[index]} curr_price={props.curr_prices[index]} ticker={value}/>
              : null }
            </Paper>
          </Grid>
        ))}
      </Grid>
</div>
  );
}