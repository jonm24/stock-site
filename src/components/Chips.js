import React, { useContext } from 'react'; 
import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TickerChip from './TickerChip';
import { DataDispatch } from './utils/DataDispatch';

export default function Chips(props) {
  const classes = useStyles();
  const { data } = useContext(DataDispatch);

  return (
    <div className="chip-container">
      <Chip className={classes.chips} label="General">
      </Chip>
      {data.tickers.filter((value) => value !== '').map((value, index) => 
        <TickerChip 
          key={index}
          index={index}
          label={value}
        /> 
      )}
    </div>
  );
}

const useStyles = makeStyles(() => ({
  chips: {
    margin: '5px 5px',
    fontSize: '0.9rem'
  },
}));