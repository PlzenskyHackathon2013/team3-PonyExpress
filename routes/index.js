var path=require('path');
var mongo = require('mongodb');

exports.index =function(req, res){
    res.sendfile(path.resolve(__dirname + '/../index.html'));
    db = null;
  };

mongo.MongoClient.connect((process.env.OPENSHIFT_MONGODB_DB_URL || "mongodb://localhost:27017/") + (process.env.OPENSHIFT_APP_NAME || 'mydb'), function(err, mydb) {
  if(!err) {
    db = mydb;
    console.log("Connected to 'mydb' database");
    db.collection('users', {strict:true}, function(err, collection) {
      if (err) {
        console.log("The 'wines' collection doesn't exist. Creating it with sample data...");
        //populateDB();
      }
    });
  }
});

exports.findAll = function(req, res) {
    db.collection('users', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.findByUsername =function(req, res){
  var username = req.params.username;
  console.log('Retrieving index for user: ' + JSON.stringify(username));
  db.collection('users', function(err, collection) {
    return collection.findOne({'username': username}, function(err, item) {
      res.send(JSON.stringify(item));
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

exports.updateByUsername =function(req, res){
  var username = req.params.username;
  var blob = req.query.blob;

  db.collection('users', function(err, collection) {
    return collection.findOne({'username': username}, function(err, item) {
      if(item == null) {
        res.send(404);
      }
    });
  });

  db.collection('users', function(err, collection) {
    collection.update({"username": username}, {"username": username, "blob": blob}, {safe:true}, function(err, result) {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        console.log('Success: ' + JSON.stringify(result[0]));
        res.send({"status": "updated", "url": "/index/" + username});
      }
    });
  });
};
