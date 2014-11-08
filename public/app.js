(function () {
  'use strict';

  var START_KEYCODE = 97;  // a
  var END_KEYCODE = 100;  // z
  var targetKeyCode;
  var startTimestamp;
  var workingAlphabet;
  var errorCount;
  var monitor = $('#monitor');
  var layout = $('img');

  var init = function () {
    targetKeyCode = START_KEYCODE;
    workingAlphabet = addWorkingAlphabet();
    errorCount = 0;
    startTimestamp = Date.now();
    $('#go').hide();
  };

  var handlePress = function (event) {
    var key = String.fromCharCode(event.which);
    var matched;

    if (targetKeyCode) {
      matched = isMatch(event.which);
      layout.toggle(!matched);
      monitor.toggle(!matched);

      if (matched) {
        handleMatch(key);
      } else {
        handleMiss(key);
      }
    } else if (event.which === 13) {
      init();
    }
  };

  var showPressedKey = function (key) {
    monitor.html(key);
  };

  var isMatch = function (keycode) {
    return keycode === targetKeyCode;
  };

  var handleMatch = function (key) {
    updateWorkingAlphabet(key);

    if (targetKeyCode++ > END_KEYCODE) {
      handleEnd();
    }
  };

  var handleMiss = function (key) {
    errorCount++;
    showPressedKey(key);
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