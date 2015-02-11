'use strict';

exports = module.exports = function(fn) {
  return function() {
    let args = Array.prototype.slice.call(arguments, 0, fn.length - 1);

    return function(done) {
      fn.apply(null, args.concat(done));
    };
  };
};
