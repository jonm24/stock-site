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
    let temp = data.tickers;
    for(let i = 0; i < temp.length; i++) {
      if (temp[i] === ticker) {
        setNotValid(true);
        return;
      }
      if (i > 3) {
        setNotValid(true); 
        return;
      }
      if (temp[i] === '') {
      
        // fetch and parse data
        const fetchedData = await user.app.functions.getNewArticles(ticker);
        const parsedData = articleHelper(fetchedData, ticker);

        //add to database
        const res = await addArticles({ variables: { data: parsedData } });
        const inserted = res.data.insertManyArticles.insertedIds;

        dispatch({ type: 'add-ticker', index: i, ticker: ticker, inserted: inserted});
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

  if (loading) {
    return null;
  }

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
    width: '12ch',
    color: 'white',
  },
}));