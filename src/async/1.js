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
      fs.readFile(inputFile, function(err, data) {
        callback(err, data);
      });
    },
    function(data, callback) {
      process1(data, function(err, data) {
        callback(err, data);
      });
    },
    function(data, callback) {
      process2(data, function(err, data) {
        callback(err, data);
      });
    },
    function(data, callback) {
      process3(data, function(err, data) {
        callback(err, data);
      });
    }
  ], function(err, result) {
    if (err) return res.status(500).send(err);
    res.status(200).send(result);
  });
});

app.listen(3000);
