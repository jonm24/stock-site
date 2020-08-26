import React, { useRef } from 'react';
import '../../styles/App.css';

export default function Tape() {
  const myRef = useRef();

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
        "proName": "FOREXCOM:DJI",
        "description": "Dow Jones"
        
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