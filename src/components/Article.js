/* eslint-disable no-useless-computed-key */
import React from 'react';
import { Chip, Card, Typography, CardMedia, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default function Article(props) {
  const classes = useStyles();

  return(
    <Card key={props.index} elevation={8} className={classes.card}>
      <div className="details">
        {props.value.image ? (
        <CardMedia 
          className={classes.image}
          image={props.value.image}>
        </CardMedia>) : <CircularProgress />}
      </div>

      <div className={classes.rowText}>
        <Typography 
          className={classes.source} 
          color="primary">
        {props.value.source}</Typography>
        <Typography 
          className={classes.title} 
          color="primary">
            <a 
              className="link" 
              href={props.value.newsURL} 
              target="_blank" 
              rel="noopener noreferrer">
            {props.value.title}</a>
        </Typography>
        <Typography 
          className={classes.preview} 
          color="primary">{props.value.preview}
        </Typography>

        <div className={classes.footer}>
          <Typography 
            className={classes.date} 
            color="primary">
          {props.value.date}</Typography>
          <Chip 
            size="small"
            className={classes.innerChips} 
            label={props.value.ticker}>
          </Chip>

          {props.value.sentiment === 'Positive' ? 
            <Chip 
              size="small"
              className={classes.sentimentP} 
              label={props.value.sentiment}>
            </Chip>
          : (props.value.sentiment === "Negative") ?
            <Chip 
              size="small"
              className={classes.sentimentNeg} 
              label={props.value.sentiment}>
            </Chip>
          : 
            <Chip 
              size="small"
              className={classes.sentimentNeu} 
              label={props.value.sentiment}>
            </Chip>
          }
        </div>
      </div>
    </Card>
  );
}

const useStyles = makeStyles(() => ({
  innerChips: {
    fontSize: '14px',
    marginLeft: '10px'
  },
  card: {
    display: 'flex',
    height: 200,
    width: '95%',
    backgroundColor: "rgb(97, 97, 97)",
    margin: '7.5px auto'
  },
  image: {
    width: 100,
    height: 200,
    marginRight: '8px',
    boxShadow: '2px 0px 7px 1px rgb(52, 52, 55)'
  },
  rowText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    marginLeft: '5px',
    marginRight: '5px'
  },
  title: {
    textAlign: "left",
    fontSize: ".80rem",
    ['@media(min-width: 450px)']: {
      fontSize: "1rem"
    },
    fontFamily: "Roboto",
    fontWeight: '700',
    marginTop: 8
  }, 
  source: {
    fontSize: ".75rem",
    ['@media(min-width: 450px)']: {
      fontSize: ".85rem"
    },
  }, 
  preview: {
    fontSize: ".65rem",
    ['@media(min-width: 450px)']: {
      fontSize: ".8rem"
    },
    paddingTop: '10px',
    textAlign: "left",
  },
  date: {
    fontSize: ".8rem",
    fontWeight: '700',
  }, 
  sentimentP: {
    backgroundColor: 'rgb(42, 183, 32)',
    color: 'white',
    marginLeft: '5px',
    fontSize: '14px'
  }, 
  sentimentNeg: {
    backgroundColor: '#bd0c2d',
    color: 'white',
    marginLeft: '5px',
    fontSize: '14px'
  }, 
  sentimentNeu: {
    backgroundColor: 'rgb(50,50,50)',
    color: 'white',
    marginLeft: '5px',
    fontSize: '14px'
  }, 
  footer: {
    display: 'flex',
    marginTop: '15px',
    alignItems: 'center',
    flexDirection: 'row'
  }
}));