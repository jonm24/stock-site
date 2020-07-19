import React from 'react';
import Form from './Form';
import Chart from './widgets/Chart';
import News from './News';
import Switcher from './Switcher';
import '../styles/App.css';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { testData } from '../testdata/testNewsData';
import { useMediaQuery } from 'react-responsive';
import Market from './widgets/Market';

export default function Dashboard() {
  const classes = useStyles();
  const isMobile = useMediaQuery({ query: '(max-width: 450px)' })

  const baseData = {
    "tickers": ['SPXUSD','NSXUSD','DJI',''],
    "articles": testData,
  };
  
  const [data, setData] = React.useState(baseData);

  return (
    <div className="dash-container">
      <div className="news-heading">
        <Typography className={classes.text}>News</Typography>
        <Form 
          setData={setData}
          data={data}
        />
      </div>
      <Switcher />
      <News
        setData={setData} 
        articles={data.articles}
        tickers={data.tickers}
      />
      {isMobile ? <Market tickers={data.tickers}/> : <Chart tickers={data.tickers}/> }
    </div>
  );
}

const useStyles = makeStyles(() => ({
  text: {
    fontSize: "3rem",
    fontFamily: "Roboto",
    color: "rgb(40, 40, 40)",
    fontWeight: '700',
    // eslint-disable-next-line no-useless-computed-key
    ['@media (max-width:400px)']: {
      fontSize: '2.5rem'
    }
  }, 
  textbox: {
    width: '15ch',
    color: 'white',
    // eslint-disable-next-line no-useless-computed-key
    ['@media (max-width:400px)']: {
      height: '5px'
    }
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
