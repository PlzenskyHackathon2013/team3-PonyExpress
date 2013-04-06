define(['router', 'config'], function (Router, config) {
	
	//route by current anchor
	config.router = new Router();


	//enable browser history
	Backbone.history.start();

});