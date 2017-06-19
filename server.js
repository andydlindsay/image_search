const express = require('express'),
      morgan = require('morgan'),
      path = require('path');

// require dotenv to populate environment variables
require('dotenv').config();

// load config
const config = require('config');

// create express app
const app = express();

// port number
const port = process.env.PORT || 8080;

// route variables
const api = require('./routes/api');

// use morgan logger except during testing
if (config.util.getEnv('NODE_ENV') !== 'test') {
    app.use(morgan('combined'));
}

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