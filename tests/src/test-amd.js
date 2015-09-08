var expection = new Tester.Expection(
  'ok1', true, 'ok2', 'done'
);

expection.then(function() {
  Tester.feedback(true);
}, function() {
  Tester.feedback(false);
});

require(['Event'], function(Event) {

  @Event
  class A {
    constructor() {
      expection.answer('ok1');
    }
  }

  var a = new A();

  expection.answer(a instanceof A);

  var testHandler = function(arg) {
    expection.answer(arg);
  };

  a.on('test', testHandler);

  var delay = function(interval) {
    return new Promise(function(resolve) {
      setTimeout(resolve, interval || 1000);
    });
  };

  setTimeout(function() {
    a.trigger('test', ['ok2']);
    setTimeout(function() {
      a.off('test', testHandler);
      setTimeout(function() {
        a.trigger('test', ['ok2']);
        setTimeout(function() {
          expection.answer('done');
        }, 50);
      }, 50);
    }, 50);
  }, 50);

});
