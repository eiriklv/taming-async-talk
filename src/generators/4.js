'use strict';

const fs = require('fs');
const express = require('express');
const process1 = require('../../lib/process');
const process2 = require('../../lib/process');
const process3 = require('../../lib/process');
const run = require('../../lib/run');
const promisify = require('../../lib/promisify');

let app = express();

app.get('/', function(req, res) {  
  run(function *() {
    let inputFile = '../../data/input.txt';

    try {
      let inputData = yield promisify(fs.readFile.bind(fs))(inputFile);
      let processedData1 = yield promisify(process1)(inputData);
      let processedData2 = yield promisify(process2)(processedData1);
      let result = yield promisify(process3)(processedData2);
      
      res.status(200).send(result);

    } catch (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(3000);
