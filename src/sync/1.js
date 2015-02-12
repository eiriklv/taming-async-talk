'use strict';

const fs = require('fs');
const express = require('express');
const process1Sync = require('../../lib/process-sync');
const process2Sync = require('../../lib/process-sync');
const process3Sync = require('../../lib/process-sync');

let app = express();

app.get('/', function(req, res) {  
  let inputFile = '../../data/input.txt';

  try {
    let inputData = fs.readFileSync(inputFile);
    let processedData1 = process1Sync(inputData);
    let processedData2 = process2Sync(processedData1);
    let result = process3Sync(processedData2);
    
    res.status(200).send(result);

  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(3000);
