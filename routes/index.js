var mongo = require('mongodb');

var BSON = mongo.BSONPure,
    db = null;

mongo.MongoClient.connect((process.env.OPENSHIFT_MONGODB_DB_URL || "mongodb://localhost:27017/") + (process.env.OPENSHIFT_APP_NAME || 'mydb'), function(err, mydb) {
  if(!err) {
    db = mydb;
    console.log("Connected to 'mydb' database");
    db.collection('users', {strict:true}, function(err, collection) {
      if (err) {
        console.log("The 'wines' collection doesn't exist. Creating it with sample data...");
        populateDB();
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

exports.addUser =function(req, res){
  var username = req.params.username;
  var blob = req.query.blob;
  db.collection('users', function(err, collection) {
    collection.update({"username": username, "blob": blob}, {safe:true, upsert:true}, function(err, result) {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        console.log('Success: ' + JSON.stringify(result[0]));
        res.send(result[0]);
      }
    });
    res.send({"status": "created", "url": "/index/" + username});
  });
};

// exports.updateUser =function(req, res){
//   var username = req.params.username;
//   var blob = req.query.blob;
//   db.collection('users', function(err, collection) {
//     collection.insert({"username": username, "blob": blob}, {safe:true}, function(err, result) {
//       if (err) {
//         res.send({'error':'An error has occurred'});
//       } else {
//         console.log('Success: ' + JSON.stringify(result[0]));
//         res.send(result[0]);
//       }
//     });
//     res.send({"status": "created", "url": "/index/" + username});
//   });
// };
