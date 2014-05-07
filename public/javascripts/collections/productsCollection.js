$(document).ready(function () {

	Store.module("Collections", function (Collections, Store, Marionette, $, _) {
		Collections.ProductsCollection = Backbone.Collection.extend({
			model: Store.Models.ProductModel
		});
	});

});