define(['backbone', 'underscore', 'text!template/list.html'], function (Backbone, _, templateList) {

	var List = {

		template: _.template(templateList),

		render: function () {
			this.$el.html(this.template);
		}

	};

	return Backbone.View.extend(List);

});