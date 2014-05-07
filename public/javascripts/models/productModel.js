Store.module("Models", function (Models, Store, Backbone, Marionette, $, _) {
	Models.ProductModel = Backbone.Model.extend({
		defaults: {
			id: "",
			name: "",
			price: "",
			photosUrls: []
		}
	});
});