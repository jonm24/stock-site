import React from 'react';
import './App.css';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {AreaChart, XAxis, YAxis, Tooltip, Area} from 'recharts';

const useStyles = makeStyles(() => ({
  ticker: {
    color: 'rgb(220, 220, 220)',
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

export default function Card(props) {
  const classes = useStyles();

  return (
    <div className="card-container">
      <Typography className={classes.ticker} variant="h4">{props.ticker}</Typography>
      <Typography className={classes.price}>{props.curr_price}</Typography>

      <div className="graph-container">
        <AreaChart width={350} height={200} data={props.chartData}
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