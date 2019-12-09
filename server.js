// Import the environment variables from the .env file
const dotenv = require('dotenv');
dotenv.config();

// Setup logging
const logger = require('synergy-logger');

// Establish connection to the MongoDB
const db = require('./lib/mongodb');
db.connect({
  server: process.env.MONGODB_SERVER,
  database: process.env.MONGODB_DBNAME,
  username: process.env.MONGODB_USERNAME,
  password: process.env.MONGODB_PASSWORD
}, function(err) {
  logger.log('error', err);
});

// Set up the Express app
const express = require('express');
const app = express();

// Make the static files in the public directory accessible from the base url.
const path = require('path');
app.use(express.static('public'));

// Set up EJS with EJS-Blocks as the view engine
const engine = require('ejs-blocks');
app.engine('ejs', engine);
app.set('view engine', 'ejs');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); // support for URL-encoded bodies
app.use(bodyParser.json()); // support for JSON-encoded bodies

// Define the API router
const router = express.Router();

// Define the default route used for api status check
router.get('/', function(req, res) { 
  res.render('index');
});

// Define the administrator only routes
logger.log('info', 'Assigning route handlers to admin only requests.')
router.post('/a/create-user', require('./routes/a/create-user').post);
router.post('/a/update-user', require('./routes/a/update-user').post);
router.post('/a/create-expression-type', require('./routes/a/create-expression-type').post);
router.post('/a/update-expression-type', require('./routes/a/update-expression-type').post);
router.get('/a/get-user', require('./routes/a/get-user').get);
router.get('/a/disable-user', require('./routes/a/disable-user').get);
router.get('/a/disable-expression-type', require('./routes/a/disable-expression-type').get);
router.get('/a/get-expression-type', require('./routes/a/get-expression-type').get);
router.get('/a/get-expression-types', require('./routes/a/get-expression-types').get);

// Define the moderator+ routes
logger.log('info', 'Assigning route handlers to mod+ only requests.');

// Define the routes accessible by the plebs
logger.log('info', 'Assigning route handlers accessible to all the pleb requests.');

// Register our router for Express to use
app.use('/', router);

// Define the handler for all invalid route requests
app.use(function(req, res) {
  res.status(404).json({ "status": "error", "error": "Invalid route requested."}).end();
});

// Set the app to listen on the port specified in the environment configuration
var server = app.listen(process.env.SERVER_PORT);
logger.log('info', 'Express listening on port ' + process.env.SERVER_PORT);

// Export app for testing purposes
module.exports = server;