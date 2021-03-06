module.exports = (function() {
  var Window = require('Window');
  var $ = process.bridge.objc;

  function Panel(NativeObjectClass, NativeViewClass, options) {
    options = options || {};
    options.styleMask = options.styleMask || ($.NSHUDWindowMask | $.NSTitledWindowMask | $.NSUtilityWindowMask | 
                                    $.NSClosableWindowMask | $.NSResizableWindowMask);
    options.width = options.width || 200;
    options.height = options.height || 250;

    if(NativeObjectClass && NativeObjectClass.type == '#')
      Window.call(this, NativeObjectClass, NativeViewClass, options);
    else
      Window.call(this, $.NSPanel, $.NSView, options);

    this.native('setFloatingPanel', $.YES);
  }

  Panel.prototype = Object.create(Window.prototype);
  Panel.prototype.constructor = Panel;

  Object.defineProperty(Panel.prototype, 'style', {
    get:function() { 
      var mask = this.native('styleMask');
      if(($.NSHUDWindowMask & mask) == $.NSHUDWindowMask) return "inspector";
      else if(($.NSUtilityWindowMask & mask) == $.NSUtilityWindowMask) return "utility";
      else return "window";
    },
    set:function(e) {
      var mask = this.native('styleMask');
      if(e == "utility") this.native('setStyleMask', (mask & ~$.NSHUDWindowMask) | $.NSMiniaturizableWindowMask );
      else if(e == "inspector") this.native('setStyleMask', (mask & ~$.NSMiniaturizableWindowMask) | $.NSHUDWindowMask);
    }
  });

  Object.defineProperty(Panel.prototype, 'floating', {
    get:function() { return this.native('isFloatingPanel') == $.YES ? true : false; },
    set:function(e) { this.native('setFloatingPanel', e ? $.YES : $.NO); }
  });

  Object.defineProperty(Panel.prototype, 'toolbar', {
    get:function() { return undefined; },
    set:function(e) { }
  });

  return Panel;
})();