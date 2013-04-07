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
				this._clearView();
				config.view = new ViewCreate({el: this._getSlot(), id: id}).render();
			} else {
				this.navigate('login', {trigger: true});
			}
		},

		deleteAction: function (id) {
			if (config.user) {
				this._clearView();
				config.view = new ViewDelete({el: this._getSlot(), id: id}).render();
			} else {
				this.navigate('login', {trigger: true});
			}
		},

		editAction: function (id) {
			if (config.user) {
				this._clearView();
				config.view = new ViewEdit({el: this._getSlot(), id: id}).render();
			} else {
				this.navigate('login', {trigger: true});
			}
		},

		listAction: function () {
			if (config.user) {
				this._clearView();
				config.view = new ViewList({el: this._getSlot()}).render();
			} else {
				this.navigate('login', {trigger: true});
			}
		},

		loginAction: function () {
			this._clearView();
			config.view = new ViewLogin({el: this._getSlot}).render();
		},

		_getSlot: function () {
			$('#content').html('');
			return $('<div/>').appendTo('#content');
		},

		_clearView: function () {
			if (config.view) {
				config.view.remove();
			}
		}

	};

	return Backbone.Router.extend(Router);

});