"use strict";

//Client.JS handles and loads in login page functions
//Handles Login Page errors and AJAX calls
var handleLogin = function handleLogin(e) {
  e.preventDefault(); //Login error messages

  $('#flippyMessage').animate({
    width: 'hide'
  }, 350);

  if ($("#user").val() == '' || $("#pass").val() == '') {
    handleError("ToonTip: Username or password is empty");
    console.log("Client.js handleLogin -> Empty username or password called");
    return false;
  } //Check session token


  console.log($("input[name=_csrf]").val()); //Sends AJAX call

  sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);
  return false;
}; //Handles Signup Page errors and AJAX calls


var handleSignup = function handleSignup(e) {
  e.preventDefault(); //Login error messages

  $("#flippyMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
    handleError("ToonTip: All fields are required");
    console.log("Client.js handleSignup -> All fields required called");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    handleError("ToonTip: Passwords do not match");
    console.log("Client.js handleSignup -> Matching passwords called");
    return false;
  } //Sends AJAX call


  sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);
  return false;
}; ////Handles Password Change Page errors and AJAX calls
//const handleChangePassword = (e) => {
//    e.preventDefault();
//    
//    //Password change page error messages
//    $("#flippyMessage").animate({width:'hide'},350);
//    
//    if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
//        handleError("ToonTip: All fields are required");
//        console.log("Client.js handleChangePass -> All fields required called");
//        return false;
//    }
//    
//    if($("#pass").val() !== $("#pass2").val()) {
//        handleError("ToonTip: Passwords do not match");
//        console.log("Client.js handleChangePass -> Matching passwords called");
//        return false;
//    }
//    
//    //Sends AJAX call
//    sendAjax('POST', $("#changePassForm").attr("action"), $("#changePassForm").serialize(), redirect);
//    
//    return false;
//};
//Handles About Page errors and AJAX calls
//const handleAbout = (e) => {
//    e.preventDefault();
//    
//    //Login error messages
//    $('#flippyMessage').animate({width:'hide'}, 350);
//    
//    if($("#email").val() == ''){
//        handleError("ToonTip: You need to put in your email");
//        console.log("Client.js handleAbout -> Empty email called");
//        return false;
//    }
//    
//    //Check session token
//    console.log($("input[name=_csrf]").val());
//    
//    //Sends AJAX call
//    sendAjax('POST', $("#emailForm").attr("action"), $("#emailForm").serialize(), redirect);
//    
//    return false;
//};
//Loads in Login Window Form


var LoginWindow = function LoginWindow(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "loginForm",
      name: "loginForm",
      onSubmit: handleLogin,
      action: "/login",
      method: "POST",
      className: "mainForm"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "username"
    }, "Username: "), /*#__PURE__*/React.createElement("input", {
      id: "user",
      type: "text",
      name: "username",
      placeholder: "username"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "pass"
    }, "Password: "), /*#__PURE__*/React.createElement("input", {
      id: "pass",
      type: "password",
      name: "pass",
      placeholder: "password"
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "formSubmit",
      type: "submit",
      value: "Login"
    }))
  );
}; //Loads in Signup Window Form


var SignupWindow = function SignupWindow(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "signupForm",
      name: "signupForm",
      onSubmit: handleSignup,
      action: "/signup",
      method: "POST",
      className: "mainForm"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "username"
    }, "Username: "), /*#__PURE__*/React.createElement("input", {
      id: "user",
      type: "text",
      name: "username",
      placeholder: "username"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "pass"
    }, "Password: "), /*#__PURE__*/React.createElement("input", {
      id: "pass",
      type: "password",
      name: "pass",
      placeholder: "password"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "pass2"
    }, "Password: "), /*#__PURE__*/React.createElement("input", {
      id: "pass2",
      type: "password",
      name: "pass2",
      placeholder: "retype password"
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "formSubmit",
      type: "submit",
      value: "Sign Up"
    }))
  );
}; ////Loads in Password Change Form
//const ChangePassWindow = (props) => {
//    return (
//        <form id="changePassForm"
//            name="changePassForm"
//            onSubmit={handleChangePassword}
//            action="/changepassword"
//            method="POST"
//            className="mainForm"
//            >
//            
//            <label htmlFor="oldPass">Old Passsword: </label>
//            <input id="oldPass" type="password" name="oldPass" placeholder="Old Password"/>
//            <label htmlFor="newPass">New Password: </label>
//            <input id="newPass" type="password" name="newPass" placeholder="New Password"/>
//            <label htmlFor="newPass2">Repeat New Password: </label>
//            <input id="newPass2" type="password" name="newPass2" placeholder="New Password"/>
//            <input type="hidden" name="_csrf" value={props.csrf} />
//            <input className="formSubmit" type="submit" value="Change Password" />
//        
//        </form>
//    );
//};
//Creates Login Window


var createLoginWindow = function createLoginWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(LoginWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
}; //Creates Signup Window


var createSignupWindow = function createSignupWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(SignupWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
}; ////Creates Password Change Window
//const createChangePassWindow = (csrf) => {
//    ReactDOM.render(
//        <ChangePassWindow csrf={csrf} />,
//        document.querySelector("#content")
//    );
//};
//Setups the necessary page and button functions


var setup = function setup(csrf) {
  var loginButton = document.querySelector("#loginButton");
  var signupButton = document.querySelector("#signupButton"); //    const changePassButton = document.querySelector("#changePassButton");
  //    const aboutButton = document.querySelector("#aboutButton");
  //                
  //    aboutButton.addEventListener("click", (e) => {
  //        e.preventDefault();
  //        createAboutWindow(csrf);
  //        return false;
  //    });
  //    
  //    changePassButton.addEventListener("click", (e) => {
  //        e.preventDefault();
  //        createChangePassWindow(csrf);
  //        return false;
  //    });

  signupButton.addEventListener("click", function (e) {
    e.preventDefault();
    createSignupWindow(csrf);
    return false;
  });
  loginButton.addEventListener("click", function (e) {
    e.preventDefault();
    createLoginWindow(csrf);
    return false;
  });
  createLoginWindow(csrf);
}; //Gets unique session token


var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
}; //Gets the session token when the page has been loaded


$(document).ready(function () {
  getToken();
});
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
