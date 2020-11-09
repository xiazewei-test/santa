// server.js
// where your node app starts

// init project
const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');

const messageApi = require('./src/controllers/api/messages');
// config js
const config = require('./conf/config');

app.use(bodyParser());
app.use(morgan());

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

// TODO: Make success page and error page
app.get('/success/:message', (request, response) => {
  response.send(request.params.message);
});
app.get('/error/:message', (request, response) => {
  response.send(request.params.message);
});

app.use('/api/messages', messageApi); 

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
