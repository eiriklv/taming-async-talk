'use strict';

const fs = require('fs');
const express = require('express');
const process1 = require('../../lib/process');
const process2 = require('../../lib/process');
const process3 = require('../../lib/process');
const run = require('../../lib/run-simple');

let app = express();

app.get('/process-file', function(req, res) {  
  run(function *() {
    let inputFile = '../../data/input.txt';
    let outputFile = '../../data/output.txt';

    try {
      let inputData = yield fs.readFile.bind(fs, inputFile);
      let processedData1 = yield process1.bind(null, inputData);
      let processedData2 = yield process2.bind(null, processedData1);
      let processedData3 = yield process3.bind(null, processedData2);
      
      yield fs.appendFile.bind(fs, outputFile, processedData3);
      res.status(200).send('processed successfully using ES6 generators and partial application');

    } catch (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(3000);
