import React, { useContext } from 'react';
import '../styles/App.css';
import { CircularProgress } from '@material-ui/core';
import Article from './Article';
import { useQuery } from '@apollo/client';
import { gql } from 'graphql.macro';
import { LoadingContext } from './utils/LoadingContext';
import { DataDispatch } from './utils/DataDispatch';

const GET_ARTICLES = gql`
  query getArticlesByIDS($IDS: ArticleQueryInput){
    articles(query: $IDS) {
      _id
      title
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

const GET_GENERAL_ARTICLES = gql`
query {
  generals {
    _id
		date
		image_url
		news_url
		sentiment
		source_name
		text
		title
  }
}
`;

export default function News(props) {
  const { loading } = useContext(LoadingContext);
  const { data } = useContext(DataDispatch);
  // query
  const IDS = { 
    "_id_in": data.articles
  };

  const { loading: artLoading, error: artError, data: artData } = useQuery(GET_ARTICLES, {
    variables: { IDS }
  });
  const { loading: genLoading, error: genError, data: genData} = useQuery(GET_GENERAL_ARTICLES);

  let mergedData = [];

  if (loading || artLoading || genLoading) return (
    <div className="loading-container">
      <CircularProgress/>
    </div>
  );
  if (artError || genError) return `Error: ${artError} ${genError}`;

  if (artData.articles.length > 0) {
    mergedData = [...genData.generals, ...artData.articles];
    mergedData.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else {
    mergedData = genData.generals;
  }

  return (
    <React.Fragment>
      {mergedData.map((value, index) => 
        <Article key={index} value={value} index={index}/>
      )}
    </React.Fragment>
  );
}



