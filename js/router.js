define(['backbone', 'view/list'], function (Backbone, ViewList) {

	var Router = {
		routes: {
			'list':     'listAction',
			'':         'indexAction',
			'*actions': 'indexAction'
		},

		indexAction: function () {
			alert('ROUTE');
		},

		listAction: function () {
			new ViewList().render();
		}

	};

	return Backbone.Router.extend(Router);

});