/* eslint-disable no-useless-computed-key */
import React from 'react';
import { Chip, Card, Typography, CardMedia, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default function Article(props) {
  const classes = useStyles();

  const militaryConvert = (adjDate) => {
    const hours = adjDate[0];
    const tail = adjDate[1];
    let time = "";

    if (hours > 0 && hours <= 12) {
      if (hours < 10) {
        time = hours.split('')[1]; 
      } else {
        time = hours
      }
    } else if (hours > 12) {
      time = (hours - 12);
    } else if (hours == 0) {
      time = "12";
    }

    time += ":" + tail;
    time += (hours >= 12) ? " PM" : " AM";
    return time;
  };

  const dateArr = String(props.value.date).split(" ");
  const finalDate = `${militaryConvert(dateArr[3].substring(0,5).split(":"))} ${dateArr[1]} ${dateArr[0]}  `;

  return(
    <Card key={props.index} elevation={8} className={classes.card}>
      <div className="details">
        {props.value.image_url ? (
        <CardMedia 
          className={classes.image}
          image={props.value.image_url}>
        </CardMedia>) : <CircularProgress />}
      </div>

      <div className={classes.rowText}>
        <Typography 
          className={classes.source} 
          color="primary">
        {props.value.source_name}</Typography>
        <Typography 
          className={classes.title} 
          color="primary">
            <a 
              className="link" 
              href={props.value.news_url} 
              target="_blank" 
              rel="noopener noreferrer">
            {props.value.title}</a>
        </Typography>
        <Typography 
          className={classes.preview} 
          color="primary">{props.value.text}
        </Typography>

        <div className={classes.footer}>
          <Typography 
            className={classes.date} 
            color="primary">
          {finalDate}</Typography>

          {props.value.ticker ? 
          <Chip 
            size="small"
            className={classes.innerChips} 
            label={props.value.ticker}>
          </Chip>
          :
            <Chip 
              size="small"
              className={classes.innerChips} 
              label="General">
            </Chip> 
          }         
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
    fontSize: '10px',
    marginLeft: '5px',
    ['@media(min-width: 450px)']: {
      fontSize: "14px",
      marginLeft: '10px'
    },
  },
  card: {
    display: 'flex',
    height: 'auto',
    width: '95%',
    backgroundColor: "rgb(97, 97, 97)",
    margin: '7.5px auto'
  },
  image: {
    width: 100,
    height: '100%',
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
    fontSize: ".7rem",
    ['@media(min-width: 450px)']: {
      fontSize: ".8rem"
    },
    color: "#242424", 
    marginTop: '10px'
  }, 
  preview: {
    fontSize: ".6rem",
    ['@media(min-width: 450px)']: {
      fontSize: ".75rem"
    },
    paddingTop: '10px',
    textAlign: "left",
  },
  date: {
    fontSize: ".6rem",
    ['@media(min-width: 450px)']: {
      fontSize: ".8rem"
    },
    fontWeight: '700',
  }, 
  sentimentP: {
    backgroundColor: 'rgb(42, 183, 32)',
    color: 'white',
    marginLeft: '5px',
    fontSize: '10px',
    ['@media(min-width: 450px)']: {
      fontSize: "14px"
    },
  }, 
  sentimentNeg: {
    backgroundColor: '#bd0c2d',
    color: 'white',
    marginLeft: '5px',
    fontSize: '10px',
    ['@media(min-width: 450px)']: {
      fontSize: "14px"
    },
  }, 
  sentimentNeu: {
    backgroundColor: 'rgb(50,50,50)',
    color: 'white',
    marginLeft: '5px',
    fontSize: '10px',
    ['@media(min-width: 450px)']: {
      fontSize: "14px"
    },
  }, 
  footer: {
    display: 'flex',
    marginTop: '15px',
    marginBottom: '15px',
    alignItems: 'center',
    flexDirection: 'row'
  }
}));