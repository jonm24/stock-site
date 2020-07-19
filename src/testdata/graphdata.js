const testGraphData = [{
  "date" : "4:00",
  "close" : 339.22,
}, {
  "date" : "3:00",
  "close" : 339.27,
}, {
  "date" : "2:00",
  "close" : 334.81,
}, {
  "date" : "1:00",
  "close" : 340.65,
}, {
  "date" : "12:00",
  "close" : 342.33,
}];

function parseData() {
  let dataArr = [{
    "date": "",
    "close": ""
  }];

  for(const elem in testGraphData) {
    dataArr.push({
      "date": testGraphData[elem]["date"],
      "close": testGraphData[elem]["close"]
    });
  }
  dataArr.reverse();
  dataArr.pop();
  return dataArr;
}


export const graphData = parseData();