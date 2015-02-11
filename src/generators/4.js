'use strict';

const fs = require('fs');
const express = require('express');
const process1 = require('../../lib/process');
const process2 = require('../../lib/process');
const process3 = require('../../lib/process');
const run = require('../../lib/run');
const promisify = require('../../lib/promisify');

let app = express();

app.get('/process-file', function(req, res) {  
  run(function *() {
    let inputFile = '../../data/input.txt';
    let outputFile = '../../data/output.txt';

    try {
      let inputData = yield promisify(fs.readFile.bind(fs))(inputFile);
      let processedData1 = yield promisify(process1)(inputData);
      let processedData2 = yield promisify(process2)(processedData1);
      let processedData3 = yield promisify(process3)(processedData2);
      
      yield promisify(fs.appendFile.bind(fs))(outputFile, processedData3);
      res.status(200).send('processed successfully using ES6 generators and promises');

    } catch (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(3000);
