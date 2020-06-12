import React from 'react';
import Cards from './Cards';
import News from './News';
import './App.css';

export default function Data(props) {
  return (
    <React.Fragment>
      <News articles={props.data.articles} tickers={props.data.tickers}/>
      <Cards chartData={props.data.chart_data} curr_prices={props.data.curr_prices} tickers={props.data.tickers}/>
    </React.Fragment>
  );
}