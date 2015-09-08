void function() {
  var Event = function(Base) {
    var touch = function(heap, name) {
      return name in heap ? heap[name] : (heap[name] = []);
    };
    var MiddleWare = function() {
      if(!(this instanceof MiddleWare)) {
        throw new TypeError('Constructor requires "new".');
      }
      var heap = {};
      this.on = function(name, handler) {
        touch(heap, name).push(handler);
        return this;
      };
      this.off = function(name, handler) {
        var arr = touch(heap, name);
        for(var i = 0; i < arr.length; i++) {
          if(arr[i] === handler) {
            arr.splice(i, 1);
            break;
          }
        }
        return this;
      };
      this.trigger = function(name, args) {
        var arr = touch(heap, name);
        for(var i = 0; i < arr.length; i++) {
          arr[i].apply(this, args);
        }
      };
      return Base.apply(this, arguments);
    };
    MiddleWare.prototype = Base.prototype;
    return MiddleWare;
  };
  // Install
  switch(true) {
    case typeof module === 'object' && typeof module.exports === 'object': // For CommonJS
      return module.exports = Event;
    case typeof define === 'function' && typeof define.amd !== 'undefined': // For AMD
      return define('Event', function(){ return Event; });
    default: // Global Installing
      Function('Event', 'this.Event = Event;')(Event);
  }
}();
