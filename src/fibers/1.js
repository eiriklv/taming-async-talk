'use strict';

var fs = require('fs');
var express = require('express');
var fibrous = require('fibrous');
var process1 = require('../../lib/process');
var process2 = require('../../lib/process');
var process3 = require('../../lib/process');

var app = express();

app.get('/process-file', function(req, res) {
  fibrous.run(function() {
    var inputFile = '../../data/input.txt';
    var outputFile = '../../data/output.txt';

    try {
      var inputData = fs.sync.readFile(inputFile);
      var processedData1 = process1.sync(inputData);
      var processedData2 = process2.sync(processedData1);
      var processedData3 = process3.sync(processedData2);

      fs.sync.writeFile(outputFile, processedData3);
      res.status(200).send('processed successfully using fibers');
    } catch (err) {
      res.status(500).send(err);
    }
  }, onError);
});

app.listen(3000);
