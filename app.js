// some change --------------------------------------------
// global variables and constants to configure auth0, nodejs, and mysql environments
// constants
global.TEST_ENVIRONMENT = "Test Environment";
global.PRODUCTION_ENVIRONMENT = "Production Environment";
global.LOCAL_ENVIRONMENT = "Local Environment";

var CREDENTIALS = require('./credentials/credentials.json');
var PERSONAL_ENV = require('./personal/personal_env.json');

var createError = require("http-errors");
var express = require("express");
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

const fileUpload = require('express-fileupload');
var path = require('path');
var session = require('express-session');
var mysql = require('mysql2');
var assassinRouter = require('./routes/assassin');
// const myCronModule = require(__dirname + '/public/javascripts/cronScripts.js');
const cron = require('node-cron');
var dbConn  = require('./lib/db');   // database object

// Removed these from tutorials, not using
// require('dotenv').config();
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// var flash = require('express-flash'); - stopped using

// Global Code constants
global.STRING_LENGTH = 45;  // set 45 char length for strings in mysql
global.ONE_PHOTO = "one";
global.MORE_THAN_ONE_PHOTO = "more";
global.CHECKBOX_ON = "on";
global.CHECKBOX_OFF = "off";
global.LEAVE_BREAK = "break";
global.LEAVE_QUIT = "quit";

// Global Return Code constants
global.CALL_SUCCESS = 1;
global.CALL_FAIL = 2;

// global cron flag variables
global.CRON_START_GAME_SCRIPT_RUNNING = 0;
global.CRON_END_GAME_SCRIPT_RUNNING = 0;
global.CRON_MORNING_START_SCRIPT_RUNNING = 0;
global.CRON_NIGHT_END_SCRIPT_RUNNING = 0;
global.CRON_2_HOURS_TO_TO_SCRIPT_RUNNING = 0;
global.CRON_1_HOUR_TO_GO_SCRIPT_RUNNING = 0;
global.CRON_CHECK_MANY_PHOTOS_SCRIPT_RUNNING = 0;
global.CRON_CHECK_OLD_PHOTOS_SCRIPT_RUNNING = 0;
global.CRON_BONUS_CONTEST_CHECKER_SCRIPT_RUNNING = 0;

// Global Confirm Code constants
global.CONFIRM_GO_LIVE = 1;
global.CONFIRM_REBUY = 2;
global.CONFIRM_TAKE_BREAK = 3;
global.CONFIRM_RETURN_BREAK = 4;
global.CONFIRM_QUIT = 5;
global.CONFIRM_REMOVE_PHONE = 6;
global.CONFIRM_FORCE_SHIFT = 7;
global.CONFIRM_BOMB = 8;

// Global Event Code constants for Alerts
global.EVENT_ASSASSINATION = 1;
global.EVENT_WAITING_TO_LIVE = 2;
global.EVENT_ASSASSINATED = 3;
global.EVENT_NEW_GO_LIVE = 4;
global.EVENT_NEW_REBUY = 5;
global.EVENT_RETURN_FROM_BREAK_TO_WAITING = 6;
global.EVENT_REMOVED_FROM_TEAM = 7;
global.EVENT_TEAMMATE_REMOVED = 8;
global.EVENT_ADDED_TO_TEAM = 9;
global.EVENT_NEW_TEAMMATE = 10;
global.EVENT_TEAM_ON_BREAK = 11;
global.EVENT_SOMEONE_ON_TEAM_QUIT = 12;
global.EVENT_NEW_TARGET = 13;
global.EVENT_BOMB_DROPPED = 14;
global.EVENT_PHOTO_APPROVED = 15;
global.EVENT_PHOTO_REJECTED = 16;
global.EVENT_GAME_START = 17;
global.EVENT_GAME_END = 18;
global.EVENT_PAID_BOUNTY = 19;
global.EVENT_MOVED_TO_WAITING = 20;
global.EVENT_MARK_TEAM_PAID = 21;
global.EVENT_MARK_TEAM_ACTIVATED = 22;
global.EVENT_MORNING_START = 23;
global.EVENT_MARK_NIGHT_END = 24;
global.EVENT_ADMIN_MESSAGE = 25;
global.EVENT_ONE_TEAM_LEFT = 26;

// Global contest codes
global.CONTEST_NEXT_KILL = 1001;
global.CONTEST_NEXT_CELEB_TARGET = 1002;
global.CONTEST_NEXT_CELEB_ASSASSIN = 1003;
global.CONTEST_FIRST_MORNING_KILL = 1004;

// Global Error Code constants
global.ERROR_ALREADY_REGISTERED = 100;
global.ERROR_PLAYER_CODE_ALREADY_IN_USE = 101;
global.ERROR_INVALID_PLAYER_CODE = 102;
global.ERROR_INVALID_PLAYER_OR_TEAM_CODE_FORMAT = 103;
global.ERROR_TEAM_NOT_FOUND_OR_QUIT = 104;
global.ERROR_TEAM_FULL = 105;
global.ERROR_CANT_REMOVE_SELF = 106;
global.ERROR_PLAYER_NOT_FOUND_OR_NOT_ON_TEAM = 107;
global.ERROR_PLAYER_ALREADY_ON_A_TEAM = 108;
global.ERROR_NO_FILE_UPLOADED = 109;
global.ERROR_INVALID_PLAYER_NAME = 110;
global.ERROR_GO_LIVE = 111;
global.ERROR_NOT_CAPTAIN = 112;
global.ERROR_NOT_ON_BREAK = 113;
global.ERROR_TOO_EARLY_TO_RETURN_FROM_BREAK = 114;
global.ERROR_MUST_BE_INACTIVE_TO_REBUY = 115;
global.ERROR_INSUFFICIENT_BOUNTIES_TO_REBUY = 116;
global.ERROR_MUST_BE_LIVE_OR_WAITING_TO_BREAK = 117;
global.ERROR_MUST_BE_LIVE_TO_ATTEMPT_KILL = 118;
global.ERROR_CONFIRM_KILL_NAMES_DONT_MATCH = 119;
global.ERROR_MUST_BE_REGISTERED_STATUS_TO_CREATE_TEAM = 120;
global.ERROR_INVALID_EMAIL = 121;
global.ERROR_INVALID_TEAM_NAME = 122;
global.ERROR_INVALID_PHONE_NUMBER = 123;
global.ERROR_INVALID_BOUNTY_PAYOUT = 124;
global.ERROR_INVALID_HOURS_TO_GO = 125;
global.ERROR_INVALID_PREP_INPUTS = 126;
global.ERROR_INSUFFICIENT_TEAMS_TO_START = 127;
global.ERROR_FEATURE_UNAVAILABLE_UNTIL_PHOTO_APPROVED = 128;
global.ERROR_AT_LEAST_ONE_INPUT_REQUIRED = 129;
global.ERROR_INVALID_DATE = 130;
global.ERROR_INVALID_INTEGER_INPUT = 131;
global.ERROR_MYSQL_SYSTEM_ERROR_ON_RPC = 132;
global.ERROR_ON_FILE_UPLOAD = 133;
global.ERROR_FEATURE_UNAVAILABLE_OVERNIGHT = 134;

global.PAYPAL_OFF = "Paypal Off";
global.PAYPAL_TEST = "Paypal Test";
global.PAYPAL_PROD = "Paypal Production";

global.TWILIO_OFF = "Twilio Off";
global.TWILIO_PROD = "Twilio Production";

global.PAYPAL_FLAG = PERSONAL_ENV.PAYPAL_ENVIRONMENT;
global.TWILIO_FLAG = PERSONAL_ENV.TWILIO_ENVIRONMENT;

const { auth } = require('express-openid-connect');

var tempNodeJSEnvHelper;	// store the Node JS env, then use it in Auth0 config

// first determine the node js environment
switch (PERSONAL_ENV.NODEJS_ENVIRONMENT)
{
		case TEST_ENVIRONMENT:

				 tempNodeJSEnvHelper = CREDENTIALS.REMOTE_NODEJS_BASE_URL_TEST; // zzzz
				 break;

		case PRODUCTION_ENVIRONMENT:

				tempNodeJSEnvHelper = CREDENTIALS.REMOTE_NODEJS_BASE_URL_PROD;
				break;

		case LOCAL_ENVIRONMENT:

        tempNodeJSEnvHelper = CREDENTIALS.NODEJS_BASE_URL_LOCALHOST;
        break;

		default:

}

var config; // auth0 config object

// Next configure auth0 with node temp var
switch (PERSONAL_ENV.AUTH0_ENVIRONMENT)
{
		case TEST_ENVIRONMENT:

					console.log("Auth0 Test");

          config = {
            authRequired: false,
            auth0Logout: true,
            secret: CREDENTIALS.AUTH0_SECRET_TEST,
            baseURL: tempNodeJSEnvHelper,
            clientID: CREDENTIALS.AUTH0_CLIENT_ID_TEST,
            issuerBaseURL: CREDENTIALS.AUTH0_ISSUER_BASE_URL_TEST
          };

          break;

		case PRODUCTION_ENVIRONMENT:

					console.log("Auth0 Prod");

          config = {
            authRequired: false,
            auth0Logout: true,
            secret: CREDENTIALS.AUTH0_SECRET_PROD,
            baseURL: tempNodeJSEnvHelper,
            clientID: CREDENTIALS.AUTH0_CLIENT_ID_PROD,
            issuerBaseURL: CREDENTIALS.AUTH0_ISSUER_BASE_URL_PROD
          };

          break;

		default:

}

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.oidc.isAuthenticated();
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));
// app.use(express.static('upload'));
//app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(session({
    cookie: { maxAge: 60000 },
    store: new session.MemoryStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}))

// app.use(flash()); - stopped using, custom error checking

app.use('/', assassinRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
