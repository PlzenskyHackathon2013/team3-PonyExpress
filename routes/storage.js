var path = require('path');
var mongo = require('mongodb');
var BSON = mongo.BSONPure;

mongo.MongoClient.connect((process.env.OPENSHIFT_MONGODB_DB_URL || "mongodb://localhost:27017/") + (process.env.OPENSHIFT_APP_NAME || 'mydb'), function(err, mydb) {
  if(!err) {
    db = mydb;
    console.log("Connected to 'mydb' database");
  }
});

exports.getByFilename = function(req, res) {
  var username = global.username;
  var file_name = req.params.file_name;

  db.collection('users', function(err, collection) {
    collection.findOne({"file_name": file_name, "username": username}, function(err, items) {
      res.send(items);
    });
  });
};

exports.delete =function(req, res){
  console.log('Deleting user: ' + JSON.stringify(global.username));
  db.collection('users', function(err, collection) {
    collection.remove({"username": global.username}, function(err, items) {
      res.send(204);
    });
  });
};

exports.deleteById =function(req, res){
  var id = req.params.id;

  console.log('Deleting user: ' + JSON.stringify(global.username));
  db.collection('users', function(err, collection) {
    collection.remove({'_id':new BSON.ObjectID(id), "username": global.username}, function(err, items) {
      res.send(204);
    });
  });
};

exports.list =function(req, res){
  console.log('Retrieving indexes for user: ' + JSON.stringify(global.username));
  db.collection('users', function(err, collection) {
    collection.find({"username": global.username}).toArray(function(err, items) {
      res.send(items);
    });
  });
};

/**
 * Add a new user with hash
 */
exports.addUser =function(req, res){
  var username = req.params.username;
  var blob     = req.query.blob;

  //check if user already exists
  db.collection('users', function(err, collection) {
    collection.findOne({'username': username}, function(err, item) {
      if (JSON.stringify(item)=='null') {
        //insert user
        db.collection('users', function(err, collection) {
          collection.update({"username": username}, {"username": username, "blob": blob}, {safe:true, upsert:true}, function(err, result) {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send(result[0]);
            }
          });

          res.send({"status": "created", "url": "/index/" + username});
        });

      } else {
        //user already exists
        res.send({"error":{"method":"addUser", "username": req.params.username}});
      }
      res.send(JSON.stringify(item));
    });
  });
};

exports.updateById =function(req, res){
  var id = req.params.id;
  var blob = req.query.blob;

  db.collection('users', function(err, collection) {
    return collection.findOne({'_id':new BSON.ObjectID(id), 'username': global.username}, function(err, item) {
      if(item == null) {
        res.send(404);
      } else {
        db.collection('users', function(err, collection) {
          collection.update({'_id':new BSON.ObjectID(id), "username": global.username}, {"username": global.username, "blob": blob}, {safe:true}, function(err, result) {
            if (err) {
              res.send({'error':'An error has occurred'});
            } else {
              console.log('Success: ' + JSON.stringify(result[0]));
              res.send({"status": "updated", "url": "/index/" + global.username});
            }
          });
        });
      }
    });
  });
};
