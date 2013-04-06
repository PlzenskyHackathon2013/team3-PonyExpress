define(function () {

	var config = {

		protocol: 'http://',
		host:     'localhost',
		uri:      '',

		getUrl: function (uri, params) {
			var url = this.protocol + this.host + this.uri + uri;

			if (params) {
				url += params.join('/');
			}

			return url;
		}

	};

	return config;

});