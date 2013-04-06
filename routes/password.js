
/*
 * GET users listing.
 */

exports.storage = function(req, res){
  res.send("respond without source");
};

exports.password = function(req, res) {
  res.send("responce with source "+req.params.id);
};
