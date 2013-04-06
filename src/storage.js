
exports.findUserById = function(req, res) {
  var id = req.params.id;
  console.log('Retrieving user: ' + JSON.stringify(id));
  db.collection('users', function(err, collection) {
    return collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
      console.log('-----');
      console.log(JSON.stringify(item));
      console.log('-----');
      return item;
    });
  });
};

exports.addUser = function(req, res) {
  var user = req.blob;
  console.log('Adding user: ' + JSON.stringify(wine));
  db.collection('users', function(err, collection) {
    collection.insert(wine, {safe:true}, function(err, result) {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        console.log('Success: ' + JSON.stringify(result[0]));
        res.send(result[0]);
      }
    });
  });
}

exports.updateWine = function(req, res) {
  var id = req.params.id;
  var wine = req.body;
  console.log('Updating wine: ' + id);
  console.log(JSON.stringify(wine));
  db.collection('wines', function(err, collection) {
    collection.update({'_id':new BSON.ObjectID(id)}, wine, {safe:true}, function(err, result) {
      if (err) {
        console.log('Error updating wine: ' + err);
        res.send({'error':'An error has occurred'});
      } else {
        console.log('' + result + ' document(s) updated');
        res.send(wine);
      }
    });
  });
}

exports.deleteWine = function(req, res) {
  var id = req.params.id;
  console.log('Deleting wine: ' + id);
  db.collection('wines', function(err, collection) {
    collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
      if (err) {
        res.send({'error':'An error has occurred - ' + err});
      } else {
        console.log('' + result + ' document(s) deleted');
        res.send(req.body);
      }
    });
  });
}


exports.findAll = function(req, res) {
  db.collection('users', function(err, collection) {
    collection.find().toArray(function(err, items) {
      console.log(JSON.stringify(items));
      //res.send(items);
    });
  });
};

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

  var wines = [
  {
    name: "CHATEAU DE SAINT COSME",
    year: "2009",
    grapes: "Grenache / Syrah",
    country: "France",
    region: "Southern Rhone",
    description: "The aromas of fruit and spice...",
    picture: "saint_cosme.jpg"
  },
  {
    name: "LAN RIOJA CRIANZA",
    year: "2006",
    grapes: "Tempranillo",
    country: "Spain",
    region: "Rioja",
    description: "A resurgence of interest in boutique vineyards...",
    picture: "lan_rioja.jpg"
  }];

  db.collection('users', function(err, collection) {
    collection.insert(wines, {safe:true}, function(err, result) {});
  });

};


/*
 * GET users listing.
 */

 exports.list = function(req, res){
  res.send("respond with a resource");
};
