import React from 'react';
import '../styles/App.css';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import { graphData } from '../testdata/graphdata';
import { useMutation, } from '@apollo/client';
import { gql } from 'graphql.macro'; 


const FIND_ARTICLES = gql`
  {  
    articles {
      _id
      date
      image_url
      news_url
      sentiment
      source_name
      text
      ticker
    }
  }
`;
const ADD_STOCK = gql`
  mutation insertOneTest($data: TestInsertInput!) {
    insertOneTest(data: $data) {
      _id
      chart_data {
        date
        close
      }
      curr_price
      ticker
    }
  } 
`;

export default function Form(props) {
  const classes = useStyles();
  const [ticker, setTicker] = React.useState('');
  const [isTextNotValid, setNotValid] = React.useState(false);

  //const [addStock, {loading, error, data}] = useMutation(ADD_STOCK);

  const addTicker = async (e) => {
    e.preventDefault();
    await validateTicker(ticker);
    console.log(props.data.tickers)
    setTicker('');
  };

  const validateTicker = async (ticker) => {
    let temp = props.data.tickers;
    let tempArticles = props.data.articles;
    for(let i = 0; i < 5; i++) {
      if (temp[i] === ticker) {
        setNotValid(true);
        return;
      }
      if (i > 3) {
        setNotValid(true); 
        return;
      }
      if (temp[i] === ''){
        let testObj = {
          "chart_data": graphData,
          "curr_price": 345.28,
          "ticker": ticker
        }
        // add to database
        //await addStock({ variables: { data: testObj } })
        //console.log(data);
        temp[i] = ticker;
        props.setData({
          "tickers": temp, 
          "articles": tempArticles, 
        });
        return;
      }
    }
  };

  const validText = () => {
    return (
      <TextField className={classes.textbox} onChange={(e) => setTicker(e.target.value.toUpperCase())} value={ticker} 
      variant="outlined" label="Enter Ticker" color="primary" InputProps={{style: {color:"white"}}}
      ></TextField>
  )};
  const invalidText = () => {
    return (
      <TextField error className={classes.textbox} onChange={(e) => setTicker(e.target.value.toUpperCase())} value={ticker}
      variant="filled" label="Enter Ticker" color="primary" InputProps={{style: {color:"white"}}}
      ></TextField>
  )};

  return (
    <form onSubmit={addTicker} className="textbox-container">
      {isTextNotValid ? invalidText() : validText()}
      <Button type="submit" className={classes.btn} 
        variant="contained" size="medium"
        color="primary">
      ADD</Button>
    </form>
  );
};

const useStyles = makeStyles(() => ({
  btn: {
    color: 'black', 
    height: '55%', 
    marginLeft: '10px'
  },
  textbox: {
    width: '15ch',
    color: 'white',
  },
}));