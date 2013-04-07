define(['backbone', 'underscore', 'text!template/create.html', 'config', 'model/password'],
	function (Backbone, _, templateCreate, config, ModelPassword) {

	var ViewCreate = {

		template: _.template(templateCreate),

		events: {
			'change #createForm-username': '_onChangeUsername',
			'change #createForm-password': '_onChangePassword',
			'click #createForm-submit':  '_onSubmit',
			'click #createForm-cancel':  '_onClickCancel'
		},

		initialize: function () {
			this.model = new ModelPassword();
		},

		render: function () {
			this.$el.html(this.template);

			return this;
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
			this.model.password = config.user.get('password');
			alert('SAVE');
			console.log(this.model.toJSON());
			//this.model.save();
		},

		_onClickCancel: function (e) {
			e.preventDefault();

			config.router.navigate('list', {trigger: true});
		}


	};

	return Backbone.View.extend(ViewCreate);

});