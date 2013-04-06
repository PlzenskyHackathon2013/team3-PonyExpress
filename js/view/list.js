define(['backbone', 'underscore', 'text!template/list.html', 'config', 'collection/indexes'],
	function (Backbone, _, templateList, config, CollectionIndexes) {

	var ViewList = {

		template: _.template(templateList),

		events: {
			'click #create': '_onClickCreate',
			'click .edit':   '_onClickEdit'
		},

		initialize: function () {
			// this._getIndexes().on('change', function () {
			// 	//mock
			// }, this);
		},

		render: function () {
			//mock
			var data = {
				passwords: [
					{id: 1, name: 'Name 1', username: 'test001', password: '123'},
					{id: 2, name: 'Name 2', username: 'test002', password: '123'}
				]
			};

			this.$el.html(this.template(data));

			return this;
		},

		//returs data for template
		_getData: function () {
			var data = this._getIndexes().toJSON();

			if (!data.passwords) {
				data.passwords = [];
			}

			return data;

		},

		_getIndexes: function () {


			config.indexes = config.indexes || new CollectionIndexes();

			return config.indexes;
		},

		_onClickCreate: function () {
			config.router.navigate('create', {trigger: true});
		},

		_onClickEdit: function (event) {
			var id = $(event.target).attr('data-id');

			config.router.navigate('edit/' + id, {trigger: true});
		}

	};

	return Backbone.View.extend(ViewList);

});