import React from 'react';
import TradingViewWidget from 'react-tradingview-widget'
import '../../styles/App.css';

export default function Chart(props) {

  console.log(props.tickers);

  return (
    <div key={props.tickers} className="widget-container">
      <TradingViewWidget
        symbol="FOREXCOM:DJI"
        interval="60"
        timezone="America/New_York"
        theme="Dark"
        locale= "en"
        toolbar_bg= "#f1f3f6"
        enable_publishing={false}
        allow_symbol_change={true}
        save_image={false}
        autosize={true}
        watchlist={props.tickers}
      />
    </div>
  );
}
