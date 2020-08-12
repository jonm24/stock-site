export const reducer = (state, action) => {
  switch (action.type) {
    case "add-ticker":
      return {
        tickers: [...state.tickers, action.ticker],
        articles: [...state.articles, ...action.inserted]
      }
    case "remove-ticker": {
      return {
        tickers: [
          ...state.tickers.slice(0, action.index),
          ...state.tickers.slice(action.index + 1)
        ],
        articles: [
          ...state.articles.slice(0, action.index * 10),
          ...state.articles.slice((action.index * 10) + 10)
        ]
      }
    }
    default: 
      return state;
  }
}