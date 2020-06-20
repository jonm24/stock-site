import React from 'react';
import { Paper, TextField, Typography, Button, makeStyles } from '@material-ui/core';

export default function Register() {
  const classes = useStyles();

  return (
    <Paper elevation={10} className={classes.paper}>
      <Typography className={classes.text}>Register</Typography>
      <TextField className={classes.tf} InputProps={{style: {color:"white"}}}
      variant="filled" label="Email"></TextField>
      <TextField className={classes.tf} InputProps={{style: {color:"white"}}}
      variant="filled" label="Password"></TextField>
      <Button variant="contained" size="medium"
        color="primary" className={classes.btn}>Register</Button>
    </Paper>
  );
}

const useStyles = makeStyles({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '20px',
    height: 320,
    width: 350,
    backgroundColor: "rgb(52, 52, 55)",
    borderRadius: "5%",
    color: "white",
    marginTop: '50px'
  },
  text: {
    fontSize: '2.5rem',
    marginBottom: '15px'
  },
  tf: {
    width: '30ch',
    marginBottom: '20px'
  }, 
  btn: {
    marginTop: '10px'
  }
});