define(['backbone', 'config'], function (Backbone, config) {

	var ModelIndex = {
        url: function() {
            return "";
        },
        toJSON: function(options) {
            var encrypted = CryptoJS.AES.encrypt(JSON.stringify(this.attributes), "password");
            var result = new Object();
            result.blob = encrypted.toString();
            return result;
        },
        parse: function(response, options) {
            if (null == response.status) {
                var decrypted = CryptoJS.AES.decrypt(response.blob, 'password');
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