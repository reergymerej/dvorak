(function () {
  'use strict';

  var START_KEYCODE = 97;  // a
  // var END_KEYCODE = 122;  // z
  var END_KEYCODE = 100;  // z
  var targetKeyCode;
  var startTimestamp;
  var workingAlphabet;
  var errorCount;

  var init = function () {
    targetKeyCode = START_KEYCODE;
    workingAlphabet = addWorkingAlphabet();
    errorCount = 0;
    startTimestamp = Date.now();
    $('#go').hide();
  };

  var handlePress = function (event) {
    var key = String.fromCharCode(event.which);

    if (targetKeyCode) {
      if (isMatch(event.which)) {
        handleMatch(key);
      } else {
        handleMiss(key);
      }
    } else if (event.which === 13) {
      init();
    }
  };

  var isMatch = function (keycode) {
    console.log(keycode, String.fromCharCode(keycode));
    return keycode === targetKeyCode;
  };

  var handleMatch = function (key) {
    updateWorkingAlphabet(key);

    if (targetKeyCode++ > END_KEYCODE) {
      handleEnd();
    }
  };

  var handleMiss = function (keycode) {
    errorCount++;
  };

  var handleEnd = function () {
    showDuration();
    showAccuracy();
    targetKeyCode = null;
    $('#go').show();
  };

  var showDuration = function () {
    var duration = Date.now() - startTimestamp;
    workingAlphabet.append($('<span class="duration">' + duration + '</span>'));
  };

  var showAccuracy = function () {
    workingAlphabet.append($('<span class="error-count">' + errorCount + '</span>'));
  };

  var updateWorkingAlphabet = function (key) {
    workingAlphabet.html(workingAlphabet.html() + key);
  };

  var addWorkingAlphabet = function () {
    return $('<div>', { class: 'alphabet' }).appendTo($('#out'));
  };

  $('body').on('keypress', handlePress);
  $('#go').on('click', init);
}());