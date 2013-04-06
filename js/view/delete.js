define(['backbone', 'underscore', 'text!template/delete.html', 'config', 'model/password'],
	function (Backbone, _, templateDelete, config, ModelPassword) {

	var ViewDelete = {

		template: _.template(templateDelete),

		events: {
			'click #deleteForm-submit':  '_onSubmit',
			'click #deleteForm-cancel':  '_onCancel'
		},

		initialize: function () {
			this.model = new ModelPassword();
		},

		render: function () {
			var data = {id: 1, name: 'Name 1', username: 'test001', password: '123'};
			this.$el.html(this.template(data));
		},


		_onSubmit: function (e) {
			e.preventDefault();
			alert('Your password is now completely lost :-(\n(hey, developer, implement that!)');
			config.router.navigate('list', {trigger: true});
		},

		_onCancel: function (e) {
			e.preventDefault();

			config.router.navigate('list', {trigger: true});
		}


	};

	return Backbone.View.extend(ViewDelete);

});