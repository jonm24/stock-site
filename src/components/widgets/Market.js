import React from 'react';
import '../../styles/App.css';

export default function Market(props) {
  const myRef = React.createRef();

  async function getName() {
    const name = await fetch("http://d.yimg.com/autoc.finance.yahoo.com/autoc?query=GOOGL&region=1&lang=en%22")
      .then(res => res.json());
    
    return name;
  }

  React.useEffect(() => {

    console.log(getName());
    /*
    const watchlist = async () => {
      let arr = []
      for await (let value of props.tickers){
        
        /*arr.push({   
          s: value,
          d: name   
        })
      } 
      return arr;
    }
    console.log(watchlist); */
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
          "symbols": props.tickers
        }
      ]
    })
    myRef.current.appendChild(script);
  }, [myRef, props.tickers]);

  return (
    <div key={props.tickers} className="market-overview" ref={myRef}></div>
  );
}