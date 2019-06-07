const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const request = require('request');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.post('*', function(req, res) {
  console.log('Request::::POST');

  console.log(req.body.method);
  console.log(req.body.request.url);
  console.log(req.body.body.DATA)

  if (req.body.method === 'POST') {
    request({
      // will be ignored
      method: 'POST',
      uri: req.body.request.url,
      json: true,
      body: req.body.body
    }, function(err, httpResponse, body) {
        console.log('PETICION HECHA');
        res.send(httpResponse).end();
    });
  } else if (req.body.method === 'GET') {

  }

});

app.listen(3000, function () {
  console.log('Movilizer-Interceptor running on port 3000');
});