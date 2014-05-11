$(document).ready(function () {
	
	Store.module("Products.Models", function (Models, Store, Backbone, Marionette, $, _) {
		Models.ProductModel = Backbone.Model.extend({
			defaults: {
				id: null,
				category_id: null,
				name: "",
				description: "",
				price: null,
				photosUrls: []
			}
		});
	});

});
