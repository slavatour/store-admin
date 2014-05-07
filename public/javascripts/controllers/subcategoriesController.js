$(document).ready(function () {

	Store.module("Categories.Controllers", function (Controllers, Store, Backbone, Marionette, $, _) {
		Controllers.SubcategoriesController = Marionette.Controller.extend({
			initialize: function () {
				this.subcategoryModel = new Store.Categories.Models.SubcategoryModel();
				this.subcategoryCollection = new Store.Categories.Collections.SubcategoriesCollection({
					model: this.subcategoryModel
				});
				this.subcategoryModelView = new Store.Categories.Views.SubcategoryModelView({
					model: this.subcategoryModel
				});
				this.subcategoryCollectionView = new Store.Categories.Views.SubcategoryCollectionView({
					model: this.subcategoryCollectionView
				});
				Store.reqres.setHandler("subcategories:model", function () {
					return this.subcategoryModel;
				},this);
				Store.reqres.setHandler("subcategories:collection", function () {
					return this.subcategoryCollection;
				},this);
				Store.reqres.setHandler("subcategories:modelView", function () {
					return this.subcategoryModelView;
				},this);
				Store.reqres.setHandler("subcategories:collectionView", function () {
					return this.subcategoryCollectionView;
				},this);
			},
			renderSubcategories: function () {
				
			}
		});

	});

});