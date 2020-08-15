import React, { useEffect, createRef, useContext} from 'react';
import '../../styles/App.css';
import { DataDispatch } from '../utils/DataDispatch';

export default function Market() {
  const myRef = createRef();
  const { data } = useContext(DataDispatch);

  useEffect(() => {

    const watchlist = () => {
      return data.tickers.map((value) => (
        {
        's': value
        }
       ));
    }

    const script = document.createElement('script');
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify(
    {
      "colorTheme": "dark",
      "dateRange": "1d",
      "showChart": true,
      "locale": "en",
      "largeChartUrl": "",
      "isTransparent": false,
      "width": "100%",
      "height": "100%",
      "plotLineColorGrowing": "rgba(0, 200, 16, 1)",
      "plotLineColorFalling": "rgba(255, 0, 0, 1)",
      "gridLineColor": "rgba(242, 242, 242, 0)",
      "scaleFontColor": "rgba(120, 123, 134, 1)",
      "belowLineFillColorGrowing": "rgba(0, 151, 37, 0.12)",
      "belowLineFillColorFalling": "rgba(255, 0, 0, 0.12)",
      "symbolActiveColor": "rgba(152, 152, 152, 0.12)",
      "tabs": [
        {
          "title": "General",
          "symbols": [
            {
              "s": "FOREXCOM:DJI",
              "d": "DJI"
            },
            {
              "s": "FOREXCOM:SPXUSD",
              "d": "SPXUSD"
            },
            {
              "s": "FOREXCOM:NSXUSD",
              "d": "NASDAQ"
            }
          ]
        },
        {
          "title": "Watchlist",
          "symbols": watchlist()
        }
      ]
    })
    myRef.current.appendChild(script);
  }, [myRef, data.tickers]);

  return (
    <div key={data.tickers} className="market-overview" ref={myRef}></div>
  );
}