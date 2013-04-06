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
/*
 * GET users listing.
 */

exports.storage = function(req, res){
  res.send("respond without source");
};

exports.password = function(req, res) {
  var id = req.params.id;
  console.log('Retrieving user: ' + JSON.stringify(id));
  db.collection('users', function(err, collection) {
    return collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
      res.send(JSON.stringify(item));
    });
  });
};
