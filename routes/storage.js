//declared variable
var path  = require('path');
var mongo = require('mongodb');
var BSON  = mongo.BSONPure;

// connect on db
mongo.MongoClient.connect((process.env.OPENSHIFT_MONGODB_DB_URL || "mongodb://localhost:27017/") + (process.env.OPENSHIFT_APP_NAME || 'mydb'), function(err, mydb) {
  if(!err) {
    db = mydb;
    console.log("Connected to 'mydb' database");
  }
});

/*
 * Get all records for username
 */
exports.get = function(req, res) {
  var username  = global.username;
  var file_name = req.params.file_name;

  db.collection('storage', function(err, collection) {
    collection.findOne({"file_name": file_name, "username": username}, function(err, items) {
      res.send(items);
    });
  });
};

/**
 * Add a new record for username
 */
exports.add =function(req, res){
  var username  = global.username;
  var blob      = req.query.blob;
  var file_name = req.params.file_name;

  //check if user already exists
  db.collection('storage', function(err, collection) {
    collection.update({"file_name": file_name, "username": username}, {"file_name": file_name, "username": username, "blob": blob}, {safe:true, upsert:true}, function(err, result) {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(result[0]);
      }
    });
  });
};

/*
 * Delete record by username
 */
exports.delete =function(req, res){
  var username  = global.username;
  var file_name = req.params.file_name;

  db.collection('storage', function(err, collection) {
    collection.remove({"username": username, "file_name": file_name}, function(err, items) {
      res.send(204);
    });
  });
};