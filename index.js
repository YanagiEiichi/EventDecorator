void function() {
  var Event = function(Base) {
    var touch = function(heap, name) { return name in heap ? heap[name] : (heap[name] = []); };
    var bindMethods = function(object) {
      var heap = {};
      object.on = function(name, handler) {
        touch(heap, name).push(handler);
        return this;
      };
      object.off = function(name, handler) {
        var arr = touch(heap, name);
        for(var i = 0; i < arr.length; i++) {
          if(arr[i] === handler) arr.splice(i, 1), i = 0 / 0;
        }
        return this;
      };
      object.trigger = function(name, args) {
        var arr = touch(heap, name);
        for(var i = 0; i < arr.length; i++) arr[i].apply(this, args);
        for(var proto = this; proto = proto.__proto__;) {
          if(proto.trigger) {
            proto.trigger(name, args);
            break;
          }
        }
        return this;
      };
    };
    var EventWrapper = function EventWrapper() {
      if(!(this instanceof EventWrapper)) throw new TypeError('Cannot call a class as a function');
      bindMethods(this);
      return Base.apply(this, arguments);
    };
    EventWrapper.prototype = Base.prototype;
    bindMethods(EventWrapper.prototype);
    return EventWrapper;
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
