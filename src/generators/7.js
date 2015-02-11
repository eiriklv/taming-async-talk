'use strict';

const fs = require('mz/fs');
const express = require('express');
const promisify = require('../../lib/promisify');
const co = require('co');

const process1 = promisify(require('../../lib/process'));
const process2 = promisify(require('../../lib/process'));
const process3 = promisify(require('../../lib/process'));

let app = express();

app.get('/process-file', function(req, res) {  
  co(function *() {
    let inputFile = '../../data/input.txt';
    let outputFile = '../../data/output.txt';

    try {
      let inputData = yield fs.readFile(inputFile);
      let processedData1 = yield process1(inputData);
      let processedData2 = yield process2(processedData1);
      let processedData3 = yield process3(processedData2);
      
      yield fs.appendFile(outputFile, processedData3);
      res.status(200).send('processed successfully using ES6 generators and promises + co + mz');

    } catch (err) {
      res.status(500).send(err);
    }
  }).catch(onError);
});

function onError(err) {
  console.log('unhandled error:', err);
}

app.listen(3000);
