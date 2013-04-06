define(['backbone', 'underscore', 'text!template/edit.html', 'config', 'model/password'],
	function (Backbone, _, templateEdit, config, ModelPassword) {

	var ViewEdit = {

		template: _.template(templateEdit),

		initialize: function () {
			// this.model.options.password = config.user.get('password');
			// this.model.on('change', this.render);
		},

		render: function () {
			//mock
			var data = {id: 1, name: 'Name 1', username: 'test001', password: '123'};

			this.$el.html(this.template(data));

			return this;
		}

	};

	return Backbone.View.extend(ViewEdit);

});