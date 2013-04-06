define(['backbone', 'model/index', 'config'], function (Backbone, ModelIndex, config) {
	
	var CollectionIndexes = {

        model: ModelIndex,

		url: function () {
			
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

	return Backbone.Collection.extend(CollectionIndexes);

});