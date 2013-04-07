define(['backbone', 'config'], function (Backbone, config) {

	var ModelPassword = {

		url: function () {
            var uri    = '/storage';
            var params = [];

			if (!this.isNew()) {
                params.push(this.get('name'));
            }

            return config.getUrl(uri, params);
		}

	};

	return Backbone.Model.extend(ModelPassword);

});