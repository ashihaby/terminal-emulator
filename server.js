var fs                  = require('fs')
  , express             = require('express')
  , sockjs              = require('sockjs')
  , shell               = require('./shell')

  , config              = require('./config');



// Setup SockJS server
var service = sockjs.createServer();

service.on('connection', function(conn) {
  if (!shell.is_connected) {
      shell.connect(config);
  } else {
    shell.start();
  }
  shell.on('data', function(data) {
        conn.write(data);
  });
  conn.on('data', function(data) {
   console.log('message ' + conn, data);
   var data = data;
   shell.emit('cmd', data);
 });
  conn.on('close', function() {});
});
// Express server
var app = express.createServer();
// log requests
app.use(express.logger('dev'));

service.installHandlers(app, {prefix:'/terminal-emulator'});

app.listen(config.http.port, config.http.host);
console.log('Listening on ' + config.http.host + ':' + config.http.port);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.use('/static', express.static(__dirname + '/static'));
