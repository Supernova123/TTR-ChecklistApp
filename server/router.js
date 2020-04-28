//Controls all server routes

//Imports Controller and Middleware Functions
const controllers = require('./controllers');
const mid = require('./middleware');


//Handles all HTTP GET and POST calls
const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getToons', mid.requiresLogin, controllers.Toon.getToons);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('/about', mid.requiresSecure, mid.requiresLogout, controllers.About.aboutPage);
  app.get('/changepassword', mid.requiresSecure, mid.requiresLogout, controllers.Password.changePasswordPage);
  app.get('/checklist', mid.requiresLogin, controllers.Checklist.checklistPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/about', mid.requiresSecure, mid.requiresLogout, controllers.About.about);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.post('/changepassword', mid.requiresSecure, mid.requiresLogout, controllers.Password.changePassword);
  app.get('/toons', mid.requiresLogin, controllers.Toon.toonPage);
  app.post('/toons', mid.requiresLogin, controllers.Toon.makeToon);
  app.post('/checklist', mid.requiresLogin, controllers.Checklist.checklist);
//  app.post('/checklist', mid.requiresLogin, controllers.Toon.postChecklist);
//  app.post('/checklistred', mid.requiresLogin, controllers.Toon.checklistRed);
//  app.post('/checklistgreen', mid.requiresLogin, controllers.Toon.checklistGreen); 
//  app.post('/checklistpurple', mid.requiresLogin, controllers.Toon.checklistPurple);
//  app.post('/checklistblue', mid.requiresLogin, controllers.Toon.checklistBlue);
//  app.post('/checklistpink', mid.requiresLogin, controllers.Toon.checklistPink);
//  app.post('/checklistyellow', mid.requiresLogin, controllers.Toon.checklistYellow);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};


//Exports router functions
module.exports = router;

