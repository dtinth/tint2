
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
  /* @hidden */ count = 0;
  var win = new Window();
  var buttonNormal = new Button();
  buttonNormal.title = "Hello";
  buttonNormal.addEventListener('mousedown', function() {
    /* @hidden */ count++;
  });
  buttonNormal.addEventListener('mouseup', function() {
    /* @hidden */ $utils.clickAtControl(buttonToggle);
  });
  win.appendChild(buttonNormal);

  win.addLayoutConstraint({
    priority:'required', relationship:'=',
    firstItem:buttonNormal, firstAttribute:'top',
    secondItem:win, secondAttribute:'top',
    multiplier:1.0, constant:0.0
  });

  var buttonToggle = new Button();
  buttonToggle.title = "Off";
  buttonToggle.type = "toggle";
  buttonToggle.state = false;
  buttonToggle.addEventListener('mousedown', function() {
    $utils.assert(buttonToggle.state == false);
  });

  buttonToggle.addEventListener('mouseup', function() {
    $utils.assert(buttonToggle.state == true);
    buttonToggle.title = buttonToggle.state == false ? "Off" : "On";
    /* @hidden */ count++;
    /* @hidden */ $utils.clickAtControl(buttonRadio);
  });
  win.appendChild(buttonToggle);
  win.addLayoutConstraint({
    priority:'required', relationship:'=',
    firstItem:buttonToggle, firstAttribute:'top',
    secondItem:buttonNormal, secondAttribute:'bottom',
    multiplier:1, constant:10
  });

  var buttonRadio = new Button();
  buttonRadio.title = "Radio Box 1";
  buttonRadio.type = "radio";
  buttonRadio.state = false;
  buttonRadio.addEventListener('mousedown', function() {
    /* @hidden */ count++;
  });
  buttonRadio.addEventListener('mouseup', function() {
    buttonRadio1.state = false;
    buttonRadio.state = true;
    /* @hidden */ $utils.clickAtControl(buttonRadio1);
  });
  win.appendChild(buttonRadio);
  win.addLayoutConstraint({
    priority:'required', relationship:'=',
    firstItem:buttonRadio, firstAttribute:'top',
    secondItem:buttonToggle, secondAttribute:'bottom',
    multiplier:1, constant:10
  });

  var buttonRadio1 = new Button();
  buttonRadio1.title = 'Radio Box 2 (Selected)';
  buttonRadio1.type = 'radio';
  buttonRadio1.state = 'true';

  buttonRadio1.addEventListener('mousedown', function() {
    /* @hidden */ count++;
    /* @hidden */ //$utils.takeSnapshotOfCurrentWindow('assets/buttons_mac.png');
    /* @hidden */ $utils.assert(buttonRadio.title == "Radio Box 1");
    /* @hidden */ $utils.assert(buttonRadio.type == "radio");
    /* @hidden */ $utils.assert(buttonRadio.state == true);
    /* @hidden */ $utils.assert(buttonRadio1.title == "Radio Box 2 (Selected)");
    /* @hidden */ $utils.assert(buttonRadio1.type == "radio");
    /* @hidden */ $utils.assert(buttonRadio1.state == false);
    /* @hidden */ $utils.assert(buttonToggle.title == "On");
    /* @hidden */ $utils.assert(buttonToggle.type == "toggle");
    /* @hidden */ $utils.assert(buttonToggle.state == true);
    /* @hidden */ $utils.assert(buttonNormal.title == "Hello");
    /* @hidden */ $utils.assert(buttonNormal.type == "normal");
    /* @hidden */ $utils.assert(count == 4);
    buttonRadio1.state = true;
    buttonRadio.state = false;
    /* @hidden */ $utils.assert(buttonRadio1.state == true);
    /* @hidden */ $utils.assert(buttonRadio.state == false);
    /* @hidden */ win.close();
    /* @hidden */ $utils.ok();
  });
  win.appendChild(buttonRadio1);
  win.addLayoutConstraint({
    priority:'required', relationship:'=',
    firstItem:buttonRadio1, firstAttribute:'leading',
    secondItem:buttonRadio, secondAttribute:'trailing',
    multiplier:1, constant:10
  });
  win.addLayoutConstraint({
    priority:'required', relationship:'=',
    firstItem:buttonRadio1, firstAttribute:'top',
    secondItem:buttonToggle, secondAttribute:'bottom',
    multiplier:1, constant:10
  });

  /* @hidden */ setTimeout(function() { $utils.clickAtControl(buttonNormal); }, 1000);
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
  timeout:true,
  name:"Buttons",
};