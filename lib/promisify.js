'use strict';

exports = module.exports = function(fn) {
  return function() {
    let self = this;
    let args = Array.prototype.slice.call(arguments);

    return new Promise(function(resolve, reject) {
      let callback = function(err, result) {
        if (err) return reject(err);
        resolve(result);
      };

      fn.apply(self, args.concat(callback));
    });
  };
};
