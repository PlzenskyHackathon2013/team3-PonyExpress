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
			'':           'indexAction',
			'*actions':   'indexAction'
		},

		createAction: function (id) {
			new ViewCreate({el: '#content', id: id}).render();
		},

		deleteAction: function (id) {
			new ViewDelete({el: '#content', id: id}).render();
		},

		editAction: function (id) {
			new ViewEdit({el: '#content', id: id}).render();
		},

		indexAction: function () {
			//we have user's credential... show list of passwords
			if (config.user) {
				this.navigate('list', {trigger: true});
			} else {
				this.navigate('login', {trigger: true});
			}
		},

		listAction: function () {
			new ViewList({el: '#content'}).render();
		},

		loginAction: function () {
			new ViewLogin({el: '#content'}).render();
		}

	};

	return Backbone.Router.extend(Router);

});