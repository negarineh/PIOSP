var express = require('express');
var app = express();
var passport = require('passport');
var expressValidator = require('express-validator');
var path = require('path');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jsonwebtoken = require("jsonwebtoken");

app.use(bodyParser.json()); //get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));


/*eslint no-unused-vars:*/
/***************Mongodb configuratrion********************/
var configDB = require('./config/database.js');
//configuration ===============================================================
// mongoose.connect(configDB.url, {
//     useMongoClient: true
// }); // connect to our database


//set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

//view engine setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs'); // set up ejs for templating

let root = path.join(__dirname, '..', 'PIOSP/front-end/build'); // (on Heroku ==>  path.join(__dirname, 'front-end', 'build'); )
app.use(express.static(root));
app.use(function(req, res, next) {
  if (req.method === 'GET' && req.accepts('html') && !req.is('json') && !req.path.includes('.')) {
    res.sendFile('index.html', { root });
  } else next();
});


app.set('lib', path.join(__dirname, 'lib'));

app.use(express.static(path.join(__dirname, 'Images')));


app.use(passport.initialize());


// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

//  JWT ========================================================================
app.use(function(req, res, next) {

    if (req.headers || req.headers.authorization || req.headers.authorization.split(' ')[0] === 'JWT') {
      jsonwebtoken.verify(req.headers, 'secret', function(err, decode) {
        // console.log(req.cookies['jwt']);
        if (err) req.user = undefined;
        req.user = decode;
        next();
      });
    } else {
      req.user = undefined;
      next();
    }
  });

// routes ======================================================================
require('./app/router/admin.js')(app); // load our routes and pass in our app and fully configured passport
require('./app/router/participant.js')(app); // load our routes and pass in our app and fully configured passport
require('./app/router/pollinatorInfo.js')(app); // load our routes and pass in our app and fully configured passport
require('./app/router/surveyResults.js')(app); // load our routes and pass in our app and fully configured passport
require('./app/router/activity.js')(app); // load our routes and pass in our app and fully configured passport
require('./app/router/surveyResultsExperience.js')(app); // load our routes and pass in our app and fully configured passport

if (app.get('env') === 'development') {
  console.log('Enabling CORS');
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With'); //Add other headers used in your requests
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("content-encoding", "gzip");
    res.header("Content-Type", "application/json");
    if (req.method == 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });
}

//we should create a favicon and add it here
app.get('/favicon.ico', function(req, res) {
  res.status(204);
});

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

// catch the uncaught errors that weren't wrapped in a domain or try catch statement
// do not use this in modules, but only in applications, as otherwise we could have multiple of these bound
process.on('uncaughtException', function(err) {
  // handle the error safely
  console.log('Uncaught Exception happend', err);
});

// using Error handling middleware
// app.use(methodOverride());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

// Error handling middleware
function logErrors (err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}

function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
}

module.exports = app;