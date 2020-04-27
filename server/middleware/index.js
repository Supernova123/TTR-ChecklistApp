//Helper functions that are used in Router.JS

//Requires the user to be logged in
const requiresLogin = (req, res, next) => {
  if (!req.session.account) {
    return res.redirect('/');
  }
  return next();
};

//Requires the user to be logged out
const requiresLogout = (req, res, next) => {
  if (req.session.account) {
    return res.redirect('/toons');
  }

  return next();
};

//Requires the user to have a HTTPS URL, not a HTTP one
const requiresSecure = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.hostname}${req.url}`);
  }
  return next();
};

//Allows the user to bypass HTTPS requirement
const bypassSecure = (req, res, next) => {
  next();
};

//Exports functions to Router.JS
module.exports.requiresLogin = requiresLogin;
module.exports.requiresLogout = requiresLogout;

//Allows a developer to bypass Secure on a Production Server
if (process.env.NODE_ENV === 'production') {
  module.exports.requiresSecure = requiresSecure;
} else {
  module.exports.requiresSecure = bypassSecure;
}
