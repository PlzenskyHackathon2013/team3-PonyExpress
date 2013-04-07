define(['router', 'config', 'collection/passwords'], function (Router, config, CollectionPasswords) {
	
	//mock server data
	config.passwords = new CollectionPasswords([
		{id: 'gmail-pswd', name: 'Gmail pswd', username: 'my.pony@gmail.com', password: 'ponyHASHpony'},
		{id: 'pony-fun-club', name: 'Pony fun club', username: 'master.pony', password: 'pony123'}
	]);

	//route by current anchor
	config.router = new Router();

	//enable browser history
	Backbone.history.start();

});