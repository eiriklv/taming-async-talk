'use strict';

exports = module.exports = function(input) {
  let start = Date.now();
  let len = 100;

  while (Date.now() < (start + len)) {}

  return input + ' - processed';
};
