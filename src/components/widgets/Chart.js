import React, { useContext } from 'react';
import TradingViewWidget from 'react-tradingview-widget'
import '../../styles/App.css';
import { DataDispatch } from '../utils/DataDispatch';

export default function Chart() {
  const { data } = useContext(DataDispatch);

  return (
    <div key={data.tickers} className="widget-container">
      <TradingViewWidget
        symbol={(data.tickers.length > 0) ? data.tickers[data.tickers.length - 1] : "FOREXCOM:DJI"}
        interval="D"
        timezone="America/New_York"
        theme="Dark"
        locale= "en"
        toolbar_bg= "#f1f3f6"
        enable_publishing={false}
        allow_symbol_change={true}
        save_image={false}
        autosize={true}
        watchlist={data.tickers}
      />
    </div>
  );
}
