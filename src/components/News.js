import React from 'react';
import '../styles/App.css';
import { Paper, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Article from './Article';
import TickerChip from './TickerChip';


export default function News(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className="chip-container">
        <Chip className={classes.chips} label="General">
        </Chip>
        {props.tickers.filter((value) => value !== '').map((value, index) => 
          <TickerChip 
            key={index}
            index={index}
            label={value}
            setData={props.setData}
            tickers={props.tickers}
            articles={props.articles}
          /> 
        )}
      </div>
      <div className="paper-container">
        <div className="article-container">
          {props.articles.map((value, index) => 
            <Article key={index} value={value} index={index}/>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

const useStyles = makeStyles(() => ({
  chips: {
    margin: '5px 5px',
    fontSize: '0.9rem'
  },
}));

