"use strict";

//Checklist.JS allows the user to check off where they are in game
var handleChecklist = function handleChecklist(e) {
  e.preventDefault(); //Login error messages

  $('#flippyMessage').animate({
    width: 'hide'
  }, 350); //Check session token

  console.log($("input[name=_csrf]").val());
  return false;
}; //Loads in About Window


var ChecklistWindow = function ChecklistWindow(props) {
  return (
    /*#__PURE__*/
    //        <h1>What is TTR Checklist?</h1>
    //        <h3>TTR Checklist is a companion application to Toontown Rewritten, a fanmade server for Disney's popular MMORPG Toontown Online. It allows a player to keep track of their in-game toon's progress, preventing the player from remembering everything</h3>
    //        <h2>What is Toontown Online?</h2>
    //        <h3>Toontown Online was a Massive Multiplayer Online Role-Playing Game created by Disney in 2003. It consisted of players entering the world of Mickey Mouse and friend as anthropromorphic characters known as "Toons." Together, everyone fights invading business-themed robots known as "Cogs" with slapstick comedy gags, including classics like cream pies, banana peels, and seltzer bottles, in order to take back Toontown!</h3>
    //        <h2>Newsletter</h2>
    //        <h3>Want to sign up for our Newsletter for updates on our application? Sign up down below! Don't worry, you'll be teleported back to the Login page once you're added to our system!</h3>
    React.createElement("form", {
      id: "emailForm",
      name: "emailForm",
      onSubmit: handleAbout,
      action: "/about",
      method: "POST",
      className: "mainForm"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "email"
    }, "Email: "), /*#__PURE__*/React.createElement("input", {
      id: "user",
      type: "text",
      name: "email",
      placeholder: "email"
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "formSubmit",
      type: "submit",
      value: "Add Email"
    }))
  );
}; //Adds toons from Mongo if necessary


var Checklist = function Checklist(props) {
  //Displays created toons
  var toonNodes = props.toons.map(function (toon) {
    return (/*#__PURE__*/React.createElement("div", {
        key: toon._id,
        className: "toon"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "toonName"
      }, " Name: ", toon.name), /*#__PURE__*/React.createElement("h3", {
        className: "toonSpecies"
      }, " Species: ", toon.species), /*#__PURE__*/React.createElement("h3", {
        className: "toonColor"
      }, " Color: ", toon.color), /*#__PURE__*/React.createElement("h3", {
        className: "toonHouse"
      }, " House: ", toon.house))
    );
  }); //Returns toon list

  return (/*#__PURE__*/React.createElement("div", {
      className: "toonList"
    }, toonNodes)
  );
};
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
