import React from 'react';
import '../../styles/App.css';

export default function Tape() {
  const myRef = React.createRef();

  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify(
    {
      "symbols": [
      {
        "proName": "FOREXCOM:SPXUSD",
        "title": "S&P 500"
      },
      {
        "proName": "FOREXCOM:NSXUSD",
        "title": "Nasdaq 100"
      },
      {
        "description": "Dow Jones",
        "proName": "FOREXCOM:DJI"
      },
    ],
    "largeChartUrl": "http://localhost:3000/",
    "colorTheme": "dark",
    "isTransparent": true,
    "displayMode": "regular",
    "locale": "en"
    })
    myRef.current.appendChild(script);
  }, [myRef]);

  return (
    <div className="ticker-tape" ref={myRef}></div>
  );
}