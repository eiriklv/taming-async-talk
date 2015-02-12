'use strict';

const fs = require('fs');
const express = require('express');
const promisify = require('../../lib/promisify');
const run = require('../../lib/run');
const readFile = promisify(fs.readFile.bind(fs));
const process1 = promisify(require('../../lib/process'));
const process2 = promisify(require('../../lib/process'));
const process3 = promisify(require('../../lib/process'));

let app = express();

app.get('/', function(req, res) {  
  run(function *() {
    let inputFile = '../../data/input.txt';

    try {
      let inputData = yield readFile(inputFile);
      let processedData1 = yield process1(inputData);
      let processedData2 = yield process2(processedData1);
      let result = yield process3(processedData2);
      
      res.status(200).send(result);

    } catch (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(3000);
