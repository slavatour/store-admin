$(document).ready(function () {
	
	Store.module("Categories.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.SubcategoryCollectionView = Backbone.Marionette.CompositeView.extend({
			// tagName: ,
			template: "#subcategoriesCollectionTemplate",
			itemView: Store.Categories.Views.SubcategoryModelView,
			// itemViewContainer: 
			initialize: function () {

			}
		});
	});

});