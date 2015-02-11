'use strict';

exports = module.exports = function(fn) {
  let gen = fn();

  function next(err, res) {
    if (err) return gen.throw(err);
    let ret = gen.next(res);
    if (ret.done) return;

    if (typeof ret.value.then === 'function') {
      try {
        ret.value.then(function(value) {
          next(null, value);
        }, next);
      } catch (e) {
        gen.throw(e);
      }
    } else {
      try {
        ret.value(next);
      } catch (e) {
        gen.throw(e);
      }
    }
  }

  next();
};
