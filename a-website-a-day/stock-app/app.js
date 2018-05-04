var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var http = require("http");
var https = require("https");

/**
 * getJSON:  REST get request returning JSON object(s)
 * @param options: http options object
 * @param callback: callback to pass the results JSON object(s) back
 */
var getJSON = function(options, onResult)
{
    console.log("rest::getJSON");

    var port = options.port == 443 ? https : http;
    var req = port.request(function(res)
    {
        var output = '';
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        //res.send('error: ' + err.message);
    });

    req.end();
};

var opts = {
  host: 'https://www.alphavantage.co',
  port: 80,
  path: '/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=demo',
  method: 'GET',
  headers: {
      'Content-Type': 'text/html'
  }
};

getJSON(opts, function(statusCode, result) {
  // I could work with the result html/json here.  I could also just return it
  console.log("onResult: (" + statusCode + ")" + JSON.stringify(result));
  res.statusCode = statusCode;
  res.send(result);
});

app.listen(80);
