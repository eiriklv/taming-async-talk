'use strict';

const fs = require('fs');
const express = require('express');
const process1 = require('../../lib/process');
const process2 = require('../../lib/process');
const process3 = require('../../lib/process');

let app = express();

app.get('/', function(req, res) {
  let inputFile = '../../data/input.txt';

  fs.readFile(inputFile, function(err, data) {
    if (err) return res.status(500).send(err);

    process1(data, function(err, data) {
      if (err) return res.status(500).send(err);

      process2(data, function(err, data) {
        if (err) return res.status(500).send(err);

        process3(data, function(err, data) {
          if (err) return res.status(500).send(err);
          
          res.status(200).send(data);
        });
      });
    });
  });
});

app.listen(3000);
