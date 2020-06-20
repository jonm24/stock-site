import React from 'react';
import Form from './Form';
import Cards from './Cards';
import News from './News';
import '../styles/App.css';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { testData } from '../testdata/testNewsData';


export default function Dashboard() {
  const classes = useStyles();

  const baseArticle = {
    "image": '',
    "source": '',
    "newsURL": "",
    "title": "",
    "preview": "",
    "date": "",
    "ticker": '',
    "sentiment": '',
  }

  const graph = {
    "date": "",
    "Price": ""
  }

  const baseData = {
    "tickers": ['','','',''],
    "curr_prices": ['','','',''],
    "articles": testData,
    "chart_data": [graph, graph, graph, graph]
  };
  
  const [data, setData] = React.useState(baseData);

  return (
    <div className="dash-container">
      <Form 
        setData={setData}
        data={data}
      />
      <div className="news-heading">
        <Typography className={classes.text}>News</Typography>
      </div>
      <News 
        articles={data.articles}
        tickers={data.tickers}
      />
      <Cards
        setData={setData}
        data={data}
      />
    </div>
  );
}

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
