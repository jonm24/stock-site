import React, { useEffect, useState, useReducer } from 'react';
import '../../styles/App.css';
import Form from '../Form';
import Chart from '../widgets/Chart';
import News from '../News';
import Chips from '../Chips';
import Market from '../widgets/Market';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from 'react-responsive';
import { LoadingContext } from '../utils/LoadingContext';
import { DataDispatch } from '../utils/DataDispatch';
import { reducer } from '../utils/reducer';

export default function Dashboard() {
  const classes = useStyles();
  const isMobile = useMediaQuery({ query: '(max-width: 450px)' });

  // generate and cache base data if cache doesn't exist
  if (!sessionStorage.data) {
    const baseData = {
      tickers: [],
      articles: []
    };
    sessionStorage.setItem("data", JSON.stringify(baseData));
  }
  // hydrate state with cached base data
  const [data, dispatch] = useReducer(reducer, JSON.parse(sessionStorage.getItem("data")));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    sessionStorage.setItem("data", JSON.stringify(data));
  }, [data])

  return (
    <div className="dash-container">
      <LoadingContext.Provider value={{ loading, setLoading}}>
        <DataDispatch.Provider value={{ data, dispatch }}>
          <div className="news-heading">
            <Typography className={classes.text}>News</Typography>
            <Form />
          </div>
          <Chips />
        
          <div className="paper-container">
            <div className="article-container">
              <News />
            </div>
          </div>
          {isMobile ? <Market /> : <Chart /> }
        </DataDispatch.Provider>
      </LoadingContext.Provider>
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
