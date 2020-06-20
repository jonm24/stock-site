import React from 'react';
import { Typography, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AreaChart, XAxis, YAxis, Tooltip, Area } from 'recharts';
import '../styles/App.css';

export default function Card(props) {
  const classes = useStyles();

  let data = JSON.parse(props.data);

  const removeTicker = (e) => {
    let temp = data.tickers
      , tempPrices = data.curr_prices
      , tempChartData = data.chart_data;

    temp.splice(props.index, 1);
    tempPrices.splice(props.index, 1);
    tempChartData.splice(props.index, 1);

    while(temp.length < 4) {
      temp.push('');
      tempPrices.push('');
      tempChartData.push({"date": "", "Price": ""});
    }
    props.setData({
      "tickers": temp,
      "curr_prices": tempPrices,
      "articles": data.articles,
      "chart_data": tempChartData
    });
  };

  return (
    <div className="card-container">
      <Chip 
        className={classes.ticker}
        onClick={removeTicker}
        onDelete={removeTicker}
        label={data.tickers[props.index]}>
      </Chip>

      <Typography className={classes.price}>{data.curr_prices[props.index]}</Typography>

      <div className="graph-container">
        <AreaChart width={350} height={200} data={data.chart_data[props.index]}
              margin={{top: 10, right: 30, left: 0, bottom: 0}}>
            <defs>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#05a905" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#05a905" stopOpacity={0}/>
              </linearGradient>
            </defs>
          <XAxis tick={{fontSize: '14px'}} dataKey="date"/>
          <YAxis tick={{fontSize: '14px'}} domain={[330, 345]}/>
          <Tooltip payload={props.chartData}/>
          <Area type='monotone' dataKey='Price' stroke='#05a905' fillOpacity={1} fill='url(#colorPv)' />
        </AreaChart>
      </div>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  btn: {
    color: 'white',
    alignSelf: 'flex-end'
  },
  ticker: {
    fontSize: '25px',
    marginTop: '15px',
    marginLeft: '20px',
    fontFamily: 'Roboto'
  },
  price: {
    color: 'rgb(220, 220, 220)',
    marginLeft: '20px',
    fontFamily: 'Roboto',
    fontSize: '3.25rem'
  }
}));