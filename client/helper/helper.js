//Helper.JS adds helper functions

//Handles errors
const handleError = (message) => {
    $("#errorMessage").text(message);
    $("#flippyMessage").animate({width:'toggle'},350);
};

//Hides Flippy error message
const redirect = (response) => {
    $("#flippyMessage").animate({width:'hide'},350);
    window.location = response.redirect;
};

//Sends data to AJAX
const sendAjax = (type, action, data, success) => {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function(xhr, status, error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};
