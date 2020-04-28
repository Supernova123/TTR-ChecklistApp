//Loads the application

//Imports libaries for use
const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const url = require('url');
const csrf = require('csurf');
const redis = require('redis');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/ToonMaker';

// Setups Mongoose to use newer functions
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(dbURL, mongooseOptions, (err) => {
  if (err) {
    console.log('Could not connect to database');
    throw err;
  }
});


//Sets up Redis for Database Storage
let redisURL = {
  hostname: 'redis-12132.c92.us-east-1-3.ec2.cloud.redislabs.com',
  port: 12132,
};

let redisPASS = 'nJj5HkyXleGFn7E6esJ9pEnQFnE0iuPK';
if (process.env.REDISCLOUD_URL) {
  redisURL = url.parse(process.env.REDISCLOUD_URL);
  [, redisPASS] = redisURL.auth.split(':');
}

const redisClient = redis.createClient({
  host: redisURL.hostname,
  port: redisURL.port,
  password: redisPASS,
});

//Pulls Router
const router = require('./router.js');

//Adds Express.JS capabilities
const app = express();
app.use('/assets', express.static(path.resolve(`${__dirname}/../hosted/`)));
app.use(favicon(`${__dirname}/../hosted/img/ttr_logo.jpg`));
app.disable('x-powered-by');
app.use(compression());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(session({
  key: 'sessionid',
  store: new RedisStore({
    client: redisClient,
  }),
  secret: 'Toon Arigato',
  resave: true,
  saveUnitialized: true,
  cookie: {
    httpOnly: true,
  },
}));

//Adds Handlebars.JS and cookie storage capabilities
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);
app.use(cookieParser());

//Adds CSRF Token capabilities
app.use(csrf());
app.use((err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);

  console.log('Missing CSRF token');
  return false;
});

//Loads the app through Router.JS
router(app);


//Tells the user what port the server is running on
app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Listening on port ${port}`);
});

