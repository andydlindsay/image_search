const express = require('express'),
      morgan = require('morgan'),
      path = require('path'),
      cors = require('cors'),
      favicon = require('serve-favicon'),
      mongoose = require('mongoose');

// require dotenv to populate environment variables
require('dotenv').config();

// load config
const config = require('config');

// create express app
const app = express();

// favicon
app.use(favicon(path.join(__dirname, 'client', 'favicon.ico')));

// use bluebird for mongoose promises
mongoose.Promise = require('bluebird');

// build db uri
let dbURI = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@ds131512.mlab.com:31512/fcc_image_search';

// change database uri if testing
if (config.util.getEnv('NODE_ENV') == 'test') {
    dbURI = 'mongodb://localhost:27017/booktradingtest';
}

// connect to the database
mongoose.connect(dbURI);

// on error
mongoose.connection.on('error', (err) => {
    console.info('Database error: ' + err);
});

// port number
const port = process.env.PORT || 8080;

// route variables
const api = require('./routes/api');

// use morgan logger except during testing
if (config.util.getEnv('NODE_ENV') !== 'test') {
    app.use(morgan('combined'));
}

// cors middleware
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname, 'client')));

// routes
app.use('/api', api);

// catchall redirect
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/index.html'));
});

// server start
const server = app.listen(port, () => {
    console.info('Server listening on port %s\n', port);
});
