import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import '../../styles/App.css';

export default function MiniChart(props) {
  const classes = useStyles();
  const myRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify(
    {
      "symbol": props.ticker,
      "width": "97%",
      "height": "97%",
      "locale": "en",
      "dateRange": "1d",
      "colorTheme": "dark",
      "trendLineColor": "rgba(0, 255, 0, 1)",
      "underLineColor": "rgba(0, 255, 0, 0.15)",
      "isTransparent": true,
      "autosize": true,
      "largeChartUrl": ""
    })
    myRef.current.appendChild(script);
    
  }, [myRef, props.ticker]);

  return (
    <Grid className={classes.gridItem} item>
      <Paper elevation={9} className={classes.paper} ref={myRef} />
    </Grid>
  );
}

const useStyles = makeStyles(() => ({
  gridItem: {
    width: '100%'
  },
  paper: {
    height: 250,
    width: '100%',
    backgroundColor: "rgb(52, 52, 55)",
    borderRadius: "5%",
    color: "white",
    display: 'flex', 
    alignItems: 'center',
    justifyContent: 'center'
  },
}));