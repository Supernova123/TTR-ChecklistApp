//Controller for About Page

//Imports functions from Model
const models = require('../models');

const { About } = models;

//Creates default login page
const aboutPage = (req, res) => {
  res.render('about', { csrfToken: req.csrfToken() });
};

//Handles errors and authentication for the Login page
const about = (request, response) => {
  const req = request;
  const res = response;

  // force cast to strings to come some securtiy flaws
  const email = `${req.body.email}`;

  if (!email) {
    console.log('About.js Email -> All fields are required called');
    return res.status(400).json({ error: 'ToonTip: All fields are required' });
  }

    req.session.account = About.AboutModel.toAPI(about);

    // console.log('Account entered successfully!');

    return res.json({ redirect: '/login' });
  };

////Handles errors and authentication for the Login page
//const about = (request, response) => {
//  const req = request;
//  const res = response;
//
//  // force cast to strings to come some securtiy flaws
//  const email = `${req.body.email}`;
//
//  if (!email) {
//    console.log('Account.js About -> All fields are required called');
//    return res.status(400).json({ error: 'ToonTip: Your email needs to be added to get our letters!' });
//  }
//    
//  return Account.AccountModel.authenticate(email, (err, account) => {
//    if (err || !account) {
//      console.log('Account.js Login -> Missing account called');
//      return res.status(401).json({ error: 'ToonTip: One of your fields is not correct' });
//    }
//
//  return res.json({ redirect: '/login' });
//});
//}

//Gets unique session token
const getToken = (request, response) => {
  const req = request;
  const res = response;

  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };

  res.json(csrfJSON);
};

//Exports functions to Controller index
module.exports.aboutPage = aboutPage;
module.exports.about = about;
