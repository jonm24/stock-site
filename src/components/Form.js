import React from 'react';
import '../styles/App.css';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import { graphData } from '../testdata/graphdata';

export default function Form(props) {
  const classes = useStyles();

  const [ticker, setTicker] = React.useState('');
  const [isTextNotValid, setNotValid] = React.useState(false);

  const addTicker = (e) => {
    e.preventDefault();
    validateTicker(ticker);
    console.log(props.data.tickers)
    setTicker('');
  };

  const validateTicker = (ticker) => {
    let temp = props.data.tickers;
    let tempPrices = props.data.curr_prices;
    let tempChartData = props.data.chart_data;
    for(let i = 0; i < 4; i++) {
      if (temp[i] === ticker) {
        setNotValid(true);
        return;
      }
      if (temp[i] === ''){
        temp[i] = ticker;
        tempPrices[i] = "$345.28";
        tempChartData[i] = graphData;
        props.setData({
          "tickers": temp, 
          "curr_prices": tempPrices, 
          "articles": props.data.articles, 
          "chart_data": tempChartData
        });
        return;
      }
      if (i === 3) {
        setNotValid(true); 
        return;
      }
    }
  };

  const validText = () => {
    return (
      <TextField className={classes.textbox} onChange={(e) => setTicker(e.target.value.toUpperCase())} value={ticker} 
      variant="outlined" label="Enter Ticker" color="primary" InputProps={{style: {color:"white"}}}
      ></TextField>
  )};
  const invalidText = () => {
    return (
      <TextField error className={classes.textbox} onChange={(e) => setTicker(e.target.value.toUpperCase())} value={ticker}
      variant="filled" label="Enter Ticker" color="primary" InputProps={{style: {color:"white"}}}
      ></TextField>
  )};

  return (
    <form onSubmit={addTicker} className="textbox-container">
      {isTextNotValid ? invalidText() : validText()}
      <Button type="submit" className={classes.btn} 
        variant="contained" size="medium"
        color="primary">
      ADD</Button>
    </form>
  );
};

const useStyles = makeStyles(() => ({
  btn: {
    color: 'black', 
    height: '55%', 
    marginLeft: '10px'
  },
  textbox: {
    width: '15ch',
    color: 'white',
  },
}));