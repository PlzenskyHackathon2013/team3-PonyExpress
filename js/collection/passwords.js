define(['backbone', 'model/password'], function (Backbone, ModelPassword) {
	
	var CollectionPasswords = {

        model: ModelPassword

	};

	return Backbone.Collection.extend(CollectionPasswords);

});