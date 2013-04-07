//mock username, it will be replace by auth
global.username="Rainbow Dash";

/**
 * Module dependencies.
 */

// define variable
var express = require('express')
  , routes = require('./routes')
  , index = require('./routes/index')
  , storage = require('./routes/storage')
  , password = require('./routes/password')
  , http = require('http')
  , path = require('path');

var app = express();
app.configure(function() {
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
});

//set enviroment
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

app.get('/', routes.homepage);

//get all list
app.get('/list', index.list);

//add new hash
app.post('/list', index.add);

// edit hash
// change to post
app.put('/list/:id', index.updateById);

// delete all record
app.delete('/list', index.delete);

// delete on hash by id
app.delete('/list/:id', index.deleteById);

//get file by id
app.get('/storage/:file_name', storage.get);

//add new file
app.post('/storage/:file_name', storage.add);

// delete file by id
app.delete('/storage/:file_name', storage.delete);

//create server
http.createServer(app).listen(app.get('port'), app.get('ipaddress'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
