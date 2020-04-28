"use strict";

//Helper.JS adds helper functions
//Handles errors
var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#flippyMessage").animate({
    width: 'toggle'
  }, 350);
}; //Hides Flippy error message


var redirect = function redirect(response) {
  $("#flippyMessage").animate({
    width: 'hide'
  }, 350);
  window.location = response.redirect;
}; //Sends data to AJAX


var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
