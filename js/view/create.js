define(['backbone', 'underscore', 'text!template/create.html', 'config', 'model/password', 'model/index'],
	function (Backbone, _, templateCreate, config, ModelPassword, ModelIndex) {

	var ViewCreate = {

		template: _.template(templateCreate),

		events: {
			'change #createForm-name':     '_onChangeName',
			'change #createForm-username': '_onChangeUsername',
			'change #createForm-password': '_onChangePassword',
			'click #createForm-submit':    '_onSubmit',
			'click #createForm-cancel':    '_onClickCancel'
		},

		initialize: function () {
			this.model = new ModelPassword();
			this.index = new ModelIndex();
		},

		render: function () {
			this.$el.html(this.template);

			return this;
		},

		_onChangeName: function (event) {
			var name = $(event.target).val();
			var id   = name.replace(/\ /, '-').toLowerCase(); 

			this.model.set({name: name, id: id});
		},

		_onChangeUsername: function (event) {
			this.model.set({username: $(event.target).val()});
		},

		_onChangePassword: function (event) {
			this.model.set({password: $(event.target).val()});
		},

		_onSubmit: function (e) {
			e.preventDefault();
			//they are pswd same?
			this.model.options = this.model.options || {};
			this.model.options.password = config.user.get('password');
			this.model.save();

			this.index.options = this.index.options || {};
			this.index.options.password = config.user.get('password');
			this.index.save();

			config.passwords.push(this.model);

			config.router.navigate('list', {trigger: true});
		},

		_onClickCancel: function (e) {
			e.preventDefault();

			config.router.navigate('list', {trigger: true});
		}


	};

	return Backbone.View.extend(ViewCreate);

});