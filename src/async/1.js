'use strict';

const fs = require('fs');
const async = require('async');
const express = require('express');
const process1 = require('../../lib/process');
const process2 = require('../../lib/process');
const process3 = require('../../lib/process');

let app = express();

app.get('/', function(req, res) {
  let inputFile = '../../data/input.txt';

  async.waterfall([
    function(callback) {
      fs.readFile(inputFile, function(err, inputData) {
        callback(err, inputData);
      });
    },
    function(inputData, callback) {
      process1(inputData, function(err, processedData1) {
        callback(err, processedData1);
      });
    },
    function(processedData1, callback) {
      process2(processedData1, function(err, processedData2) {
        callback(err, processedData2);
      });
    },
    function(processedData2, callback) {
      process3(processedData2, function(err, processedData3) {
        callback(err, processedData3);
      });
    }
  ], function(err, result) {
    if (err) return res.status(500).send(err);
    res.status(200).send(result);
  });
});

app.listen(3000);
