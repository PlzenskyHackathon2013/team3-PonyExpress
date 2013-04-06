define(['backbone', 'model/index', 'config'], function (Backbone, ModelIndex, config) {
	
	var CollectionIndexes = {

        model: ModelIndex,

		url: function () {
			
		},
	};

	return Backbone.Collection.extend(CollectionIndexes);

});