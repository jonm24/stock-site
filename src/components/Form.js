import React, { useContext, useState } from 'react';
import '../styles/App.css';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import { useMutation, } from '@apollo/client';
import { gql } from 'graphql.macro'; 
import { articleHelper } from './utils/articleHelper';
import { useRealmApp } from '../realm/RealmApp';
import { LoadingContext } from './utils/LoadingContext';
import { DataDispatch } from './utils/DataDispatch';

const ADD_ARTICLES = gql`
  mutation insertManyArticles($data: [ArticleInsertInput!]!) {
    insertManyArticles(data: $data) {
      insertedIds
    }
  }
`;

export default function Form() {
  const classes = useStyles();
  const { user } = useRealmApp();
  const { loading, setLoading } = useContext(LoadingContext);
  const { data, dispatch } = useContext(DataDispatch);
  const [ticker, setTicker] = useState('');
  const [error, setError] = useState(false);
  const [isTextNotValid, setNotValid] = useState(false);

  const [addArticles] = useMutation(ADD_ARTICLES);

  const addTicker = async (e) => {
    e.preventDefault();
    setLoading(true);
    await validateTicker(ticker);
    setTicker('');
    setLoading(false);
  };

  const validateTicker = async (ticker) => {
    if (data.tickers.length >= 4) {
      console.log('too big');
      setNotValid(true); 
      return;
    }
    for(let i = 0; i < data.tickers.length; i++) {
      if (data.tickers[i] === ticker) {
        console.log('ticker already there');
        setNotValid(true);
        return;
      }
    }
    // fetch and parse data
    const fetchedData = await user.app.functions.getNewArticles(ticker);
    if (fetchedData.error) {
      setNotValid(true);
      setError(true);
      return;
    }
    const parsedData = articleHelper(fetchedData.data, ticker);

    // add to database
    const res = await addArticles({ variables: { data: parsedData } });
    const inserted = res.data.insertManyArticles.insertedIds;

    dispatch({ type: 'add-ticker', ticker: ticker, inserted: inserted});
  };

  if (loading) {
    return null;
  }

  if (error) {
    return (`There was an error fetching new articles. Make sure you've entered the correct ticker`);
  }

  return (
    <form onSubmit={addTicker} className="textbox-container">
      <TextField 
        error={isTextNotValid}
        className={classes.textbox} onChange={(e) => setTicker(e.target.value.toUpperCase())} value={ticker} 
        variant="outlined" label="Enter Ticker" color="primary" InputProps={{style: {color:"white"}}}
      ></TextField>
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
    width: '13ch',
    color: 'white',
  },
}));