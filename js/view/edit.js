define(['backbone', 'underscore', 'text!template/edit.html', 'config', 'model/password'],
	function (Backbone, _, templateEdit, config, ModelPassword) {

	var ViewEdit = {

		template: _.template(templateEdit),

		events: {
			'click #editForm-submit':  '_onClickSubmit',
			'click #editForm-cancel':  '_onClickCancel'
		},


		initialize: function () {
			// this.model.options.password = config.user.get('password');
			// this.model.on('change', this.render);
		},

		render: function () {
			//mock
			var data = {id: 1, name: 'Name 1', username: 'test001', password: '123'};

			this.$el.html(this.template(data));
		},

		_onClickSubmit: function (e) {
			e.preventDefault();

			//TODO: Implement this ;)
			alert("Yeah, pasword now saved. (hey, developer, implement this!)");

			config.router.navigate('list', {trigger: true});
		},

		_onClickCancel: function (e) {
			e.preventDefault();

			config.router.navigate('list', {trigger: true});
		}

	};

	return Backbone.View.extend(ViewEdit);

});