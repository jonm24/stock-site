import React from 'react';
import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default function TickerChip(props) {
  const classes = useStyles();

  // handle removal of ticker from card
  const removeTicker = () => {
    let temp = props.tickers;
    temp.splice(props.index, 1);
    while(temp.length < 4) {
      temp.push('');
    }
    props.setData({
      "tickers": temp,
      "articles": props.articles
    });
  };

  return (
    <Chip 
      className={classes.chips}
      onClick={removeTicker}
      onDelete={removeTicker}
      label={props.label}
    />
  );
}

const useStyles = makeStyles(() => ({
  chips: {
    margin: '5px 5px',
    fontSize: '0.9rem'
  },
}));