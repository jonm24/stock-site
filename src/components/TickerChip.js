import React, { useContext } from 'react';
import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DataDispatch } from './utils/DataDispatch';

export default function TickerChip(props) {
  const classes = useStyles();
  const { dispatch } = useContext(DataDispatch);

  // handle removal of ticker from card
  const removeTicker = () => dispatch({ type: "remove-ticker", index: props.index});

  return (
    <Chip 
      className={classes.chips}
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