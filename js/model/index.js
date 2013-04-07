define(['backbone', 'config'], function (Backbone, config) {

	var ModelIndex = {

        url: function () {
            var uri    = '/list';
            var params = [];

			if (!this.isNew()) {
                params.push(this.get('id'));
            }

            return config.getUrl(uri, params);
		},

        toJSON: function(options) {
            var json = Backbone.Model.prototype.toJSON.apply(this, arguments);
            var pswd = this.options.password || '';

            var encrypted = CryptoJS.AES.encrypt(JSON.stringify(json), pswd);

            return {blob: encrypted.toString()};
        },
        
        parse: function(response, options) {
            if (null == response.status) {
                var decrypted = CryptoJS.AES.decrypt(response.blob, this.options.password);
                attr = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
                return attr;
            }
            else {
                return response;
            }
        }
	};
	return Backbone.Model.extend(ModelIndex);

});