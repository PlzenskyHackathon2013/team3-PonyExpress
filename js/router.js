define(['backbone', 'view/list', 'view/login', 'config'], function (Backbone, ViewList, ViewLogin, config) {

	var Router = {

		routes: {
			'list':     'listAction',
			'login':    'loginAction',
			'':         'indexAction',
			'*actions': 'indexAction'
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