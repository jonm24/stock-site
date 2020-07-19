import React from 'react';
import Card from './Card';
import '../styles/App.css';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


export default function Cards(props) {
  const classes = useStyles();

  return (
    <div className="side-grid-container">
      <Grid container justify="center" spacing={2}>
        {props.data.tickers.map((value, index) => (
          <Grid key={index} item>
            <Paper elevation={9} className={classes.paper}>
              {value !== '' ? 
                  <Card 
                    setData={props.setData}
                    data={JSON.stringify(props.data)}
                    index={index}
                  />
              : null }
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  paper: {
    height: 350,
    width: 350,
    backgroundColor: "rgb(52, 52, 55)",
    borderRadius: "5%",
    color: "white",
  },
}));