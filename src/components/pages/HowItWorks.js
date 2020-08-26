import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { makeStyles, Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import enterTicker from '../../assets/enter-ticker.png';
import chartWatchlist from '../../assets/chart-watchlist.png';
import miniChart from '../../assets/mini-chart.png';
import chartToolbar from '../../assets/chart-toolbar.png';

export default function HowItWorks() {
  const classes = useStyles();
  const isMobile = useMediaQuery({ query: '(max-width: 450px)' });

  return (
    <div className="policy-container">
      <Helmet>
        <title>How It Works</title>
        <meta 
          name="description" 
          content="Please read through this page to understand how our stock market research website works." 
        />
      </Helmet>
      <h1>How It Works</h1>
      <div className="aux-container">
        <div style={{padding: '0px 15px'}}className="contact-form-col">
          <h2 style={{alignSelf: 'center'}}>Getting Started</h2>
          <div className={classes.container} style={{alignItems: 'center'}}>
            <Typography style={{margin: '10px 10px'}}>Enter ticker symbol in textbox:</Typography>
            <img src={enterTicker} alt="ticker search box"></img>
          </div>
          <hr className={classes.hr}></hr>
          <Typography style={{margin: '10px auto', maxWidth: '400px'}}>
            That's it! The entered ticker symbol's latest news articles will be sorted in and the following will be added:
          </Typography>
          <hr className={classes.hr}></hr>
          <div className={classes.container}>
            <div style={{margin: '10px 10px'}}>
              <Typography>(Desktop)</Typography>
              <Typography>Symbol added to watchlist of chart</Typography>
              <img src={chartWatchlist} alt="chart watchlist"></img>
            </div>
            <div style={{margin: '10px 10px'}}>
              <Typography>(Mobile)</Typography>
              <Typography>Mini-chart generated for symbol</Typography>
              <img src={miniChart} alt="mini chart"></img>
            </div>
          </div>
          {isMobile ? null : 
            <div className={classes.chartFeats}>
              <h2>Advanced Chart Features</h2>
              <img src={chartToolbar} alt='chart toolbar'></img>
              <ol style={{textAlign: 'left', alignSelf: 'center'}}>
                <li>
                  <Typography style={{marginLeft: '10px'}}>Change the ticker from within the chart</Typography>
                </li>
                <li>
                  <Typography style={{marginLeft: '10px'}}>Change the time frame of the chart</Typography>
                </li>
                <li>
                  <Typography style={{marginLeft: '10px'}}>Add technical indicators to the chart</Typography>
                </li>
              </ol>
            </div>
            }
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chartFeats: {
    display: 'flex',
    flexDirection: 'column', 
    alignSelf: 'center', 
    padding: '0px 10px'
  },
  hr: {
    width: '100%', 
    border: '1px solid #343437',
    margin: '10px auto'
  },
}));