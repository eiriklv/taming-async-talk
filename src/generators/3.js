'use strict';

const fs = require('fs');
const express = require('express');
const process1 = require('../../lib/process');
const process2 = require('../../lib/process');
const process3 = require('../../lib/process');
const run = require('../../lib/run-simple');
const thunkify = require('../../lib/thunkify');

let app = express();

app.get('/', function(req, res) {  
  run(function *() {
    let inputFile = '../../data/input.txt';

    try {
      let inputData = yield thunkify(fs.readFile.bind(fs))(inputFile);
      let processedData1 = yield thunkify(process1)(inputData);
      let processedData2 = yield thunkify(process2)(processedData1);
      let result = yield thunkify(process3)(processedData2);
      
      res.status(200).send(result);

    } catch (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(3000);
