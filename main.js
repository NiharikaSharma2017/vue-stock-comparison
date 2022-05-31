const express = require('express')
var cors = require('cors');
var fs = require('fs');
const app = express()

app.use(cors());

app.use('/app', express.static(__dirname + '/ui/dist'));

let stocks_data="";

const background=function() {
  fs.readFile(__dirname +'/stock-compare-ui/src/assets/json/stocks.json', 'utf8', function(err, data) {
  if (!err) {
    stocks_data = JSON.parse(data);
    // console.log(stocks_data);
  } else {
    console.log(err);
  }
})}

background();

app.get('/stocks', (req, res) => {
  res.json({
    "stocks":stocks_data
  });
})

app.listen(3000, () => {
  console.log(`MESS (Mongo Event Sourcing) listening at http://localhost:3000`);
});