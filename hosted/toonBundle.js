"use strict";

//Toon.JS allows the user to create toons
//Handles Toon Creation AJAX calls
var handleToon = function handleToon(e) {
  e.preventDefault(); //Error message checking

  $("#flippyMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#toonName").val() == '' || $("#toonSpecies").val() == '' || $("#toonColor").val() == '') {
    handleError("ToonTip: All fields are required!");
    console.log("Toon.js handleToon -> Empty field called");
    return false;
  } //Sends AJAX to server


  sendAjax('POST', $("#toonForm").attr("action"), $("#toonForm").serialize(), function () {
    loadToonsFromServer();
  });
  return false;
}; //Creates the form to allow the user to add a toon


var ToonForm = function ToonForm(props) {
  return (/*#__PURE__*/React.createElement("form", {
      id: "toonForm",
      onSubmit: handleToon,
      name: "toonForm",
      action: "/toons",
      method: "POST",
      className: "toonForm"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }, "Name: "), /*#__PURE__*/React.createElement("input", {
      id: "toonName",
      type: "text",
      name: "name",
      placeHolder: "Toon Name"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "species"
    }, "Species: "), /*#__PURE__*/React.createElement("input", {
      id: "toonSpecies",
      type: "text",
      name: "species",
      placeholder: "Toon Species"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "color"
    }, "Color: "), /*#__PURE__*/React.createElement("input", {
      id: "toonColor",
      type: "text",
      name: "color",
      placeholder: "Toon Color"
    }), /*#__PURE__*/React.createElement("label", {
      htmlFor: "house"
    }, "House: "), /*#__PURE__*/React.createElement("select", {
      className: "select-option",
      id: "toonHouse",
      name: "house"
    }, /*#__PURE__*/React.createElement("option", {
      selected: "selected",
      value: "red"
    }, "Red"), /*#__PURE__*/React.createElement("option", {
      value: "green"
    }, "Green"), /*#__PURE__*/React.createElement("option", {
      value: "purple"
    }, "Purple"), /*#__PURE__*/React.createElement("option", {
      value: "blue"
    }, "Blue"), /*#__PURE__*/React.createElement("option", {
      value: "pink"
    }, "Pink"), /*#__PURE__*/React.createElement("option", {
      value: "yellow"
    }, "Yellow")), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "makeToonSubmit",
      type: "submit",
      value: "Make Toon"
    }))
  );
}; //Adds toons from Mongo if necessary


var ToonList = function ToonList(props) {
  //Empty Toon check
  if (props.toons.length === 0) {
    return (/*#__PURE__*/React.createElement("h3", {
        className: "emptyToon"
      }, "No Toons Yet")
    );
  } //        if(props.toons.length >= 7) {
  //        handleError("ToonTip: You can only have up to 6 toons!");
  //        console.log("Toon.js ToonList -> Max number of toons called")
  //        toons.remove(6);
  //        console.log(props.toons.length);
  //        }
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
}; //Loads toon from the server


var loadToonsFromServer = function loadToonsFromServer() {
  sendAjax('GET', '/getToons', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(ToonList, {
      toons: data.toons
    }), document.querySelector("#toons"));
  });
}; //Renders DOM according to toon creations


var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(ToonForm, {
    csrf: csrf
  }), document.querySelector("#makeToon"));
  ReactDOM.render( /*#__PURE__*/React.createElement(ToonList, {
    toons: []
  }), document.querySelector("#toons"));
  loadToonsFromServer();
}; //Gets session token


var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
}; //Gets token upon server load


$(document).ready(function () {
  getToken();
});
