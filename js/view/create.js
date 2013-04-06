define(['backbone', 'underscore', 'text!template/create.html', 'config', 'model/password'],
	function (Backbone, _, templateCreate, config, ModelPassword) {

	var ViewCreate = {

		template: _.template(templateCreate),

		events: {
			'change input[type="username"]': '_onChangeUsername',
			'change input[type="password"]': '_onChangePassword',
			'click input[type="submit"]':    '_onSubmit'
		},

		initialize: function () {
			this.model = new ModelPassword();
		},

		render: function () {
			this.$el.html(this.template);
		},

		_onChangeUsername: function (event) {
			this.model.set({username: $(event.target).val()});
		},

		_onChangePassword: function (event) {
			this.model.set({password: $(event.target).val()});
		},

		_onSubmit: function () {
			//they are pswd same?
			this.model.password = config.user.get('password');
			alert('SAVE');
			console.log(this.model.toJSON());
			//this.model.save();
		}

	};

	return Backbone.View.extend(ViewCreate);

});