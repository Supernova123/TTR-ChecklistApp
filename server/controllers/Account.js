//Controller for Account Pages

//Imports functions from Model
const models = require('../models');

const { Account } = models;

//Creates default login page
const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
};

//Logs out the user
const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

//Handles errors and authentication for the Login page
const login = (request, response) => {
  const req = request;
  const res = response;

  // force cast to strings to come some securtiy flaws
  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;

  if (!username || !password) {
    console.log('Account.js Login -> All fields are required called');
    return res.status(400).json({ error: 'ToonTip: All fields are required' });
  }

  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      console.log('Account.js Login -> Missing account called');
      return res.status(401).json({ error: 'ToonTip: One of your fields is not correct' });
    }

    req.session.account = Account.AccountModel.toAPI(account);

    // console.log('Account entered successfully!');

    return res.json({ redirect: '/toons' });
  });
};

//Handles errors and authentication for the Signup page
const signup = (request, response) => {
  const req = request;
  const res = response;

  // cast to strings to cover up some security flaws
  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;

  if (!req.body.username || !req.body.pass || !req.body.pass2) {
    console.log('Account.js Signup -> All fields are required called');
    return res.status(400).json({ error: 'ToonTip: All fields are required' });
  }

  if (req.body.pass !== req.body.pass2) {
    console.log('Account.js Signup -> Non-matching passwords called');
    return res.status(400).json({ error: 'ToonTip: Passwords do not match' });
  }

  //Creates and stores new account
  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
    };

    const newAccount = new Account.AccountModel(accountData);

    const savePromise = newAccount.save();

    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      res.json({ redirect: '/toons' });
    });

    savePromise.catch((err) => {
      console.log(err);

      if (err.code === 11000) {
        console.log('Account.js Signup -> Username already in use called');
        return res.status(400).json({ error: 'ToonTip: That username is already in use' });
      }

      console.log('Account.js Signup -> Error occurred called');
      return res.status(400).json({ error: 'The Cogs made an error occur! Sorry about that!' });
    });
  });
};

//Handles errors and authentication for the Change Password page
const changePassword = (request, response) => {
  const req = request;
  const res = response;

  // cast to strings to cover up some security flaws
  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;

  if (!req.body.username || !req.body.pass || !req.body.pass2) {
    console.log('Account.js ChangePass -> All fields are required called');
    return res.status(400).json({ error: 'ToonTip: All fields are required' });
  }

  if (req.body.pass !== req.body.pass2) {
    console.log('Account.js ChangePass -> Non-matching passwords called');
    return res.status(400).json({ error: 'ToonTip: Your password must match' });
  }
    
return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      console.log('Account.js Login -> Missing account called');
      return res.status(401).json({ error: 'ToonTip: One of your fields is not correct' });
    }

    req.session.account = Account.AccountModel.toAPI(account);

    // console.log('Account entered successfully!');

    return res.json({ redirect: '/toons' });
  });
};

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
module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signup = signup;
module.exports.changePassword = changePassword;
module.exports.getToken = getToken;
