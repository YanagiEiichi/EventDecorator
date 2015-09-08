'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var expection = new Tester.Expection('ok1', true, 'ok2', 'done');

expection.then(function () {
  Tester.feedback(true);
}, function () {
  Tester.feedback(false);
});

require(['Event'], function (Event) {
  var A = (function () {
    function A() {
      _classCallCheck(this, _A);

      expection.answer('ok1');
    }

    var _A = A;
    A = Event(A) || A;
    return A;
  })();

  var a = new A();

  expection.answer(a instanceof A);

  var testHandler = function testHandler(arg) {
    expection.answer(arg);
  };

  a.on('test', testHandler);

  var delay = function delay(interval) {
    return new Promise(function (resolve) {
      setTimeout(resolve, interval || 1000);
    });
  };

  setTimeout(function () {
    a.trigger('test', ['ok2']);
    setTimeout(function () {
      a.off('test', testHandler);
      setTimeout(function () {
        a.trigger('test', ['ok2']);
        setTimeout(function () {
          expection.answer('done');
        }, 50);
      }, 50);
    }, 50);
  }, 50);

  console.log(2);
});
console.log(1);