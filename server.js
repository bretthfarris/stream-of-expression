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

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); // support for URL-encoded bodies
app.use(bodyParser.json()); // support for JSON-encoded bodies

// Define the API router
const router = express.Router();

// Define the default route used for api status check
router.get('/', function(req, res) { 
  return res.status(200).json({ "status": "ok" }).end();
});

// Define the /m/user routes
logger.log('info', 'Assigning route handlers to /a/user requests')
const userRoute = require('./routes/m/user');
router.delete('/m/user', userRoute.delete);
router.get('/m/user', userRoute.get);
router.post('/m/user', userRoute.post);
router.put('/m/user', userRoute.put);

// Register our router for Express to use
app.use('/', router);

// Define the handler for all invalid route requests
app.use(function(req, res) {
  res.status(404).json({ "status": "error", "error": "invalid route requested"}).end();
});

// Set the app to listen on the port specified in the environment configuration
var server = app.listen(process.env.SERVER_PORT);
logger.log('info', 'Express listening on port ' + process.env.SERVER_PORT);

// Export app for testing purposes
module.exports = server;