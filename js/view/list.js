define(['backbone', 'underscore', 'text!template/list.html', 'config', 'collection/indexes'],
	function (Backbone, _, templateList, config, CollectionIndexes) {

	var ViewList = {

		template: _.template(templateList),

		render: function () {
			var indexes = this._getIndexes();

			this.$el.html(this.template(indexes));
		},

		_getIndexes: function () {
			config.indexes = config.indexes || new CollectionIndexes().fetch({password: config.user.get('password')});

			return config.indexes;
		}

	};

	return Backbone.View.extend(ViewList);

});