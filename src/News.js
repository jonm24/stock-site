import React from 'react';
import './App.css';
import { Paper, Chip, Card, CardMedia, Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  paper: {
    height: 715,
    '@media (max-width: 1200px)': {
      height: 1245,
      borderRadius: "10%/3%"
    },
    width: 600,
    backgroundColor: "rgb(52, 52, 55)",
    borderRadius: "7%/5%",
    color: "white",
  },
  innerPaper: {
    backgroundColor: "rgb(52, 52, 55)",
    height: 630,
    width: 600,
    overflow: 'auto',
  },
  chips: {
    marginTop: '10px',
    marginLeft: '10px',
    fontSize: '18px'
  },
  innerChips: {
    fontSize: '14px',
    marginLeft: '10px'
  },
  card: {
    display: 'flex',
    height: 200,
    width: 555,
    backgroundColor: "rgb(97, 97, 97)",
    marginBottom: '15px'
  },
  image: {
    width: 150,
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
    fontSize: "1.1rem",
    fontFamily: "Roboto",
    fontWeight: '700',
    marginTop: 8
  }, 
  source: {
    fontSize: ".95rem",
  }, 
  preview: {
    fontSize: ".8rem",
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

export default function News(props) {
  const classes = useStyles();  

  return (
    <div className="side-feed-container">
      <Paper elevation={9} className={classes.paper}>
        <div className="chip-container">
          <Chip 
            className={classes.chips}
            label="General">
          </Chip>
          {props.tickers.filter((value) => value !== '').map((value, index) => 
            <Chip 
              className={classes.chips}
              key={index}
              label={value}>
            </Chip>
          )}
        </div>

        <Paper elevation={0} className={classes.innerPaper}>
          <div className="news-container">
            {props.articles.map((value, index) => 
              <Card key={index} elevation={8} className={classes.card}>
                <div className="details">
                  {value.image ? (
                  <CardMedia 
                    className={classes.image}
                    image={value.image}>
                  </CardMedia>) : <CircularProgress />}
                </div>

                <div className={classes.rowText}>
                  <Typography 
                    className={classes.source} 
                    color="primary">
                  {value.source}</Typography>
                  <Typography 
                    className={classes.title} 
                    color="primary">
                      <a 
                        className="link" 
                        href={value.newsURL} 
                        target="_blank" 
                        rel="noopener noreferrer">
                      {value.title}</a>
                  </Typography>
                  <Typography 
                    className={classes.preview} 
                    color="primary">{value.preview}
                  </Typography>

                  <div className={classes.footer}>
                    <Typography 
                      className={classes.date} 
                      color="primary">
                    {value.date}</Typography>
                    <Chip 
                      size="small"
                      className={classes.innerChips} 
                      label={value.ticker}>
                    </Chip>

                    {value.sentiment === 'Positive' ? 
                      <Chip 
                        size="small"
                        className={classes.sentimentP} 
                        label={value.sentiment}>
                      </Chip>
                    : (value.sentiment === "Negative") ?
                      <Chip 
                        size="small"
                        className={classes.sentimentNeg} 
                        label={value.sentiment}>
                      </Chip>
                    : 
                      <Chip 
                        size="small"
                        className={classes.sentimentNeu} 
                        label={value.sentiment}>
                      </Chip>
                    }

                  </div>

                </div>
              </Card>
            )}
          </div>
        </Paper>
      </Paper>
    </div>
  );
}


