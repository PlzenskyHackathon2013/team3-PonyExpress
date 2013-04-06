var db = require('../src/storage');
/*
 * GET users listing.
 */

exports.storage = function(req, res){
  res.send("respond without source");
};

exports.password = function(req, res) {
  data = db.findUserById(req);
  db.findAll();
  res.send("responce with source "+req.params.id + JSON.stringify(data));
};
