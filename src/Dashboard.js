import React from 'react';
import './App.css';
import Data from "./Data";
import { Typography, TextField, Button } from '@material-ui/core';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { testData } from './testNewsData';
import { graphData } from './graphdata';

const useStyles = makeStyles(() => ({
  text: {
    fontSize: "3rem",
    fontFamily: "Roboto",
    color: "rgb(40, 40, 40)",
    fontWeight: '700'
  }, 
  textbox: {
    width: '15ch',
    color: 'white',
  }, 
  btn: {
    color: 'black', 
    height: '60%', 
    marginLeft: '10px'
  }, 
  labelStyle: {
    color: 'white'
  }
}));
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
  },
});

export default function Dashboard() {
  const classes = useStyles();

  const article = {
    "image": '',
    "source": '',
    "newsURL": "",
    "title": "",
    "preview": "",
    "date": "",
    "ticker": '',
    "sentiment": '',
  }

  const graph = [{
    "date": "",
    "Price": ""
  }]

  const baseData = {
    "tickers": ['','','',''],
    "curr_prices": ['','','',''],
    "articles": testData,
    "chart_data": [graph, graph, graph, graph]
  };
  
  const [ticker, setTicker] = React.useState('');
  const [data, setData] = React.useState(baseData);
  const [isTextNotValid, setNotValid] = React.useState(false);

  const handleText = (e) =>  setTicker(e.target.value.toUpperCase());

  const addTicker = (e) => {
    e.preventDefault();
    validateTicker(ticker);
    console.log(data.tickers)
    setTicker('');
  };
  const removeTicker = (e) => {
    let temp = data.tickers;
    let tempPrices = data.curr_prices;
    let tempChartData = data.chart_data;
    for(let i = 3; i > -1; i--) {
      if (temp[i] !== '') {
        temp[i] = '';
        tempPrices[i] = '';
        tempChartData[i] = {"date": "", "Price": ""};
        setData({"tickers": temp, "curr_prices": tempPrices, "articles": data.articles, "chart_data": tempChartData});
        console.log(data.tickers);
        return;
      }
    }
  };
  const validateTicker = (ticker) => {
    let temp = data.tickers;
    let tempPrices = data.curr_prices;
    let tempChartData = data.chart_data;
    for(let i = 0; i < 4; i++) {
      if (temp[i] === ticker) {
        setNotValid(true);
        return;
      }
      if (temp[i] === ''){
        temp[i] = ticker;
        tempPrices[i] = "$345.28";
        tempChartData[i] = graphData;
        setData({"tickers": temp, "curr_prices": tempPrices, "articles": data.articles, "chart_data": tempChartData});
        return;
      }
      if (i === 3) {
        setNotValid(true); 
        return;
      }
    }
  }
  const validText = () => {
    return (
      <TextField className={classes.textbox} onChange={handleText} value={ticker} variant="outlined" label="Enter Ticker" color="primary"></TextField>
  )};
  const invalidText = () => {
    return (
      <TextField error className={classes.textbox} onChange={handleText} value={ticker} variant="filled" label="Enter Ticker" color="primary"></TextField>
  )};

  return (
    <ThemeProvider theme={theme}>
      <div className="dash-container">
        <form onSubmit={addTicker} className="textbox-container">
          {isTextNotValid ? invalidText() : validText()}
          <Button type="submit" className={classes.btn} 
            variant="contained" size="medium"
            color="primary">
          ADD</Button>
          <Button onClick={removeTicker} className={classes.btn}
            variant="contained" size="medium"
            color="primary">
          Remove</Button>
        </form>
        
        <div className="news-heading">
          <Typography className={classes.text}>News</Typography>
        </div>

        <Data key={data} data={data}/>
      </div>
    </ThemeProvider>
  );
}