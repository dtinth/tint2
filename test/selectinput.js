
/**
 * @unit-test-setup
 * @ignore
 */
function setup() {
  require('Common');
}

function baseline() {
}

/**
 * @see {Notification}
 * @example
 */
function run($utils) {
  var mainWindow = new Window();
  var input = new SelectInput();
  var input2 = new SelectInput();

  input.addItem('One');
  input.addItem('Two');
  input.addItem('Three');

  mainWindow.appendChild(input);
  mainWindow.appendChild(input2);

  mainWindow.addLayoutConstraint({
    priority:'required', relationship:'=',
    firstItem:input, firstAttribute:'top',
    secondItem:mainWindow, secondAttribute:'top',
    multiplier:1.0, constant:10.0
  });
  mainWindow.addLayoutConstraint({
    priority:'required', relationship:'=',
    firstItem:input, firstAttribute:'bottom',
    secondItem:mainWindow, secondAttribute:'top',
    multiplier:1.0, constant:30.0
  });
  mainWindow.addLayoutConstraint({
    priority:'required', relationship:'=',
    firstItem:input, firstAttribute:'left',
    secondItem:mainWindow, secondAttribute:'left',
    multiplier:1.0, constant:10.0
  });
  mainWindow.addLayoutConstraint({
    priority:'required', relationship:'=',
    firstItem:input, firstAttribute:'right',
    secondItem:mainWindow, secondAttribute:'right',
    multiplier:1.0, constant:-10.0
  });
  mainWindow.addLayoutConstraint({
    priority:'required', relationship:'=',
    firstItem:input2, firstAttribute:'top',
    secondItem:mainWindow, secondAttribute:'top',
    multiplier:1.0, constant:60.0
  });
  mainWindow.addLayoutConstraint({
    priority:'required', relationship:'=',
    firstItem:input2, firstAttribute:'bottom',
    secondItem:mainWindow, secondAttribute:'top',
    multiplier:1.0, constant:80.0
  });
  mainWindow.addLayoutConstraint({
    priority:'required', relationship:'=',
    firstItem:input2, firstAttribute:'left',
    secondItem:mainWindow, secondAttribute:'left',
    multiplier:1.0, constant:10.0
  });
  mainWindow.addLayoutConstraint({
    priority:'required', relationship:'=',
    firstItem:input2, firstAttribute:'right',
    secondItem:mainWindow, secondAttribute:'right',
    multiplier:1.0, constant:-10.0
  });

  /* @hidden */ var ready = false;
  /* @hidden */ var go = false;
  /* @hidden */ var inputStart = false;
  /* @hidden */ var inputEnd = false;
  /* @hidden */ var inputEv = false;
  input.addEventListener('input', function(e) {
    /* @hidden */ if(go) inputEv = true; 
  });
  input.addEventListener('inputstart', function(e) { 
    /* @hidden */ if(go) inputStart = true; 
  });
  input.addEventListener('inputend', function(e) { 
    /* @hidden */ if(go) $utils.ok();
  });
  input.addEventListener('mouseup', function(e) { 
    /* @hidden */ if(go) $utils.keyAtControl('a'); 
  });
  input.addEventListener('mousemove', function(e) { 
  });
  input.addEventListener('keyup', function(e) {
    /* @hidden */ if(go) $utils.assert(inputStart);
    /* @hidden */ if(go) $utils.assert(inputEv);
    /* @hidden */ if(go) $utils.assert(input.value == 'Twoa');
    /* @hidden */ if(go) $utils.clickAtControl(input2);
  });
  input.addEventListener('change', function(e) {
    /* @hidden */ if(input.selectedIndex == 0) $utils.assert(input.value == "One", 'Expected "One" but got "' + input.value + '"');
    /* @hidden */ if(input.selectedIndex == 1) {
    /* @hidden */   ready = true;
    /* @hidden */   $utils.assert(input.value == "Two");
    /* @hidden */   setTimeout(function() { $utils.clickAtControl(input2); }, 500);
    /* @hidden */   setTimeout(function() { go = true; $utils.clickAtControl(input); }, 1000);
    /* @hidden */ }
  });
  /* @hidden */ input.addEventListener('keydown', function(e) { }); // doesn't work
  /* @hidden */ input.addEventListener('mouseup', function(e) { }); // doesn't work
  /* @hidden */ input.addEventListener('rightmousedown', function(e) { }); // doesn't work
  /* @hidden */ input.addEventListener('rightmouseup', function(e) { }); // doesn't work
  /* @hidden */ input.addEventListener('mouseenter', function(e) { }); // doesn't work
  /* @hidden */ input.addEventListener('mouseexit', function(e) { }); // doesn't work

  /* @hidden */ $utils.assert(input.length == 3);
  /* @hidden */ setTimeout(function() { $utils.clickAtControl(input); }, 500);
  /* @hidden */ setTimeout(function() { $utils.keyAtControl("DOWN"); }, 500);
  /* @hidden */ setTimeout(function() { $utils.keyAtControl("DOWN"); }, 500);
  /* @hidden */ setTimeout(function() { $utils.keyAtControl("DOWN"); }, 500);
  /* @hidden */ setTimeout(function() { $utils.keyAtControl("RETURN"); }, 500);
}

/**
 * @unit-test-shutdown
 * @ignore
 */
function shutdown() {
}

module.exports = {
  setup:setup, 
  run:run, 
  shutdown:shutdown, 
  shell:false,
  name:"SelectInput",
};