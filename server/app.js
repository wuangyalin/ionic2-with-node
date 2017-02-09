var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');
var async = require('async');
var path = require('url');
var jsonfile = require("jsonfile");
var app = express();
var products = [];

var index = 0;
app.get('/', function (req, res, next) {
  var seed = 'https://www.chemistwarehouse.com.au/Shop-Online/3000/Promotions';

  superagent.get(seed)
    .end(function (err, sres) {
      if (err) {
        return next(err);
      }
      var $ = cheerio.load(sres.text);
      var urls = [];
      $('.DataListCategory .category-entry').each(function (idx, element) {
        var $element = $(element);
        var number = $element.find($('.category-count')).html();
        number = number.replace(/\(|\)/g,'');
        var url = path.resolve(seed, $element.attr('href')+'?size='+number);
        var category = $element.find($('.category-name')).html();
        urls.push(url);
        //fetchInfo(categories,url,idx,res);
      });
      async.mapLimit(urls, 5, function (url, callback) {
        fetchInfo(url,callback);
      }, function (err, result) {
        console.log('finish');
        //console.log(result);
        res.send(products);
        jsonfile.writeFile('Promotions.json', products, function (err) {
          if(err){
            console.log(err);
            process.exit(1);
          }else{
            console.log("write jsonfile successful");
            //process.exit(0);
          }
        })
      });
    });
});

var concurrencyCount = 0; // 当前并发数记录  
var fetchInfo = function(url, callback){
    var fileName = url.substring(url.lastIndexOf("/") + 1, url.lastIndexOf("?"));
    products.push({
      category: fileName
    });
    //console.log(fileName);
    concurrencyCount++;
    superagent
      .get(url)
      .end(function(err, sres){  
        var $ = cheerio.load(sres.text);    
        products[index].detail = [];            
        $('.product-container').each(function (idx,element){
          var $element= $(element);
          products[index].detail.push({
            image: $element.find($('.product-image img')).attr('src'),
            title: $element.find($('.product-name')).html().trim(),
            price: $element.find($('.prices .Price')).html().trim()
          });
        });
        concurrencyCount--;
        index++;
        callback(null, url);
      });
};

app.listen(3000, function () {
  console.log('app is listening at port 3000');
});