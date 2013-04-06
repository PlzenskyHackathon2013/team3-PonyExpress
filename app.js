
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , index = require('./routes/index')
  , password = require('./routes/password')
  , http = require('http')
  , path = require('path');

var app = express();
app.configure(function() {
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
});

// all environments
app.set('ipaddress', process.env.OPENSHIFT_INTERNAL_IP);
app.set('port', process.env.OPENSHIFT_INTERNAL_PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/lib', express.static(path.join(__dirname, 'lib')));
app.use('/js', express.static(path.join(__dirname, 'js')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/password', password.storage);

app.get('/password/:id', password.password);
console.log(JSON.stringify(password));

app.post('/index/:username', index.addUser);
app.put('/list/:username/:id', index.updateById);
app.get('/list/:username', index.listByUsername);
app.get('/index', index.findAll);

http.createServer(app).listen(app.get('port'), app.get('ipaddress'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
