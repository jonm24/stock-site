export const articleHelper = (articles, ticker) => {
  let dataArr = [];
  for(const elem in articles) {
    dataArr.push({
    "image_url": articles[elem].image_url,
    "source_name": articles[elem].source_name,
    "news_url": articles[elem].news_url,
    "title": articles[elem].title,
    "text": articles[elem].text.substring(0, 75) + '...',
    "date": articles[elem].date.split(', ')[1],
    "ticker": ticker,
    "sentiment": articles[elem].sentiment,
    });
  }
  return dataArr;
}