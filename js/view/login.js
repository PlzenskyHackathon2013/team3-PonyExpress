define(['backbone', 'underscore', 'text!template/login.html', 'config', 'model/user'], function (Backbone, _, templateLogin, config, ModelUser) {

	var ViewLogin = {

		template: _.template(templateLogin),

		events: {
			'change #loginForm-username':     '_onChangeUsername',
			'change #loginForm-password': '_onChangePassword',
			'click #loginForm-submit':    '_onSubmit'
		},

		render: function () {
			this.$el.html(this.template);

			return this;
		},

		_getUser: function () {
			return config.user = config.user || new ModelUser();
		},

		_onChangePassword: function (event) {
			this._getUser().set({password: $(event.target).val()});
		},

		_onChangeUsername: function (event) {
			this._getUser().set({username: $(event.target).val()});
		},

		_onSubmit: function (e) {
			e.preventDefault();
			console.log(this._getUser());
			//TODO validation (empty values)
			config.router.navigate('list', {trigger: true});
		}

	};

	return Backbone.View.extend(ViewLogin);

});