//declare variable
var path = require('path');
var mongo = require('mongodb');
var BSON = mongo.BSONPure;

//connection on db
mongo.MongoClient.connect((process.env.OPENSHIFT_MONGODB_DB_URL || "mongodb://localhost:27017/") + (process.env.OPENSHIFT_APP_NAME || 'mydb'), function(err, mydb) {
  if(!err) {
    db = mydb;
    console.log("Connected to 'mydb' database");
    db.collection('users', {strict:true}, function(err, collection) {
      if (err) {
        console.log("The 'data' collection doesn't exist. Creating it with sample data...");
      }
    });
  }
});

/*
 * Find all records without filter by user
 */
exports.findAll = function(req, res) {
    db.collection('users', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

/*
 * Delete all records
 */
exports.delete = function(req, res){
  var username = global.username;
  console.log('Deleting user: ' + JSON.stringify(username));
  db.collection('users', function(err, collection) {
    collection.remove({"username": username}, function(err, items) {
      res.send(204);
    });
  });
};

/*
 * Delete one record by id
 */
exports.deleteById = function(req, res){
  var id       = req.params.id;
  var username = global.username;

  console.log('Deleting user: ' + JSON.stringify(username));
  db.collection('users', function(err, collection) {
    collection.remove({'_id':new BSON.ObjectID(id), "username": username}, function(err, items) {
      res.send(204);
    });
  });
};


/*
 * Get all records for one user
 */
exports.list =function(req, res){
  var username = global.username;
  console.log('Retrieving indexes for user: ' + JSON.stringify(username));
  db.collection('users', function(err, collection) {
    collection.find({"username": username}).toArray(function(err, items) {
      res.send(items);
    });
  });
};

/**
 * Add a new record
 */
exports.add =function(req, res){
  var blob     = req.query.blob;
  var username = global.username;

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

          res.send(201, {"status": "created", "url": "/index/" + username});
        });

      } else {
        //user already exists
        res.send(409, {"error":{"method":"addUser", "username": username}});
      }
      res.send(JSON.stringify(item));
    });
  });
};


/*
 * Update record by id
 */
exports.updateById =function(req, res){
  var id       = req.params.id;
  var blob     = req.query.blob;
  var username = global.username;

  db.collection('users', function(err, collection) {
    return collection.findOne({'_id':new BSON.ObjectID(id), 'username': username}, function(err, item) {
      if(item == null) {
        res.send(404, {"error":{"method":"updateById", "username": username}});
      } else {
        db.collection('users', function(err, collection) {
          collection.update({'_id':new BSON.ObjectID(id), "username": username}, {"username": username, "blob": blob}, {safe:true}, function(err, result) {
            if (err) {
              res.send({'error':'An error has occurred'});
            } else {
              console.log('Success: ' + JSON.stringify(result[0]));
              res.send({"status": "updated", "url": "/index/" + username});
            }
          });
        });
      }
    });
  });
};