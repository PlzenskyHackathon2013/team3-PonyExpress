define(['backbone', 'model/index', 'config'], function (Backbone, ModelIndex, config) {
	
	var CollectionIndexes = {

        model: ModelIndex,

		url: function () {
            var uri = '/list';

            return config.getUrl(uri);
        }
	};

	return Backbone.Collection.extend(CollectionIndexes);

});