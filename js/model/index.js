define(['backbone', 'config'], function (Backbone, config) {

	var ModelIndex = {
        url: function () {
			return "";
		},
    
        toJSON: function(options) {
            var encrypted = CryptoJS.AES.encrypt(JSON.stringify(this.attributes), this.options.password);
            return encrypted.toString();
        },
        parse: function(response, options) {
            var decrypted = CryptoJS.AES.decrypt(JSON.parse(response), this.options.password);
            return decrypted.toString(CryptoJS.enc.Utf8);
        }
	};
	return Backbone.Model.extend(ModelIndex);

});