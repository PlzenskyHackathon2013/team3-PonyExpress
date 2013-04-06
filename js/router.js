define([
	'backbone',
	'view/create',
	'view/delete',
	'view/edit',
	'view/list', 
	'view/login', 
	'config'
], function (Backbone, ViewCreate, ViewDelete, ViewEdit, ViewList, ViewLogin, config) {

	var Router = {

		routes: {
			'create':     'createAction',
			'delete/:id': 'deleteAction',
			'edit/:id':   'editAction',
			'list':       'listAction',
			'login':      'loginAction',
			'':           'listAction',
			'*actions':   'listAction'
		},

		createAction: function (id) {
			if (config.user) {
				config.view = new ViewCreate({el: '#content', id: id}).render();
			} else {
				this.navigate('login', {trigger: true});
			}
		},

		deleteAction: function (id) {
			if (config.user) {
				config.view = new ViewDelete({el: '#content', id: id}).render();
			} else {
				this.navigate('login', {trigger: true});
			}
		},

		editAction: function (id) {
			if (config.user) {
				config.view = new ViewEdit({el: '#content', id: id}).render();
			} else {
				this.navigate('login', {trigger: true});
			}
		},

		listAction: function () {
			if (config.user) {
				config.view = new ViewList({el: '#content'}).render();
			} else {
				this.navigate('login', {trigger: true});
			}
		},

		loginAction: function () {
			config.view = new ViewLogin({el: '#content'}).render();
		}

	};

	return Backbone.Router.extend(Router);

});