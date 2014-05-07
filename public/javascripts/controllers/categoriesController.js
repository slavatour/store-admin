$(document).ready(function () {

	Store.module("Categories.Controllers", function (Controllers, Store, Backbone, Marionette, $, _) {
		Controllers.ViewCategoriesListController = Marionette.Controller.extend({
			initialize: function () {
				this.categoryModel = new Store.Categories.Models.CategoryModel();
				this.categoriesCollection = new Store.Categories.Collections.CategoriesCollection();
				this.categoryModelView = new Store.Categories.Views.CategoryModelView();
				this.categoriesCollectionView = new Store.Categories.Views.CategoryCollectionView();
				Store.reqres.setHandler("category:model", function () {
					return this.categoryModel;
				},this);
				Store.reqres.setHandler("category:collection", function () {
					return this.categoriesCollection;
				},this);
				Store.reqres.setHandler("category:modelView", function () {
					return this.categoryModelView;
				},this);
				Store.reqres.setHandler("category:collectionView", function () {
					return this.categoriesCollectionView;
				},this);
			},
			fetchCategories: function (callbackFunction) {
				this.collection.fetch({
					success: function (data) {
						callbackFunction(data);
					}
				});
			},
			fetchSubcategories: function (callbackFunction) {
				this.subcollection.url = this.subcollection.url+'/parent_id/all';
				this.subcollection.fetch({
					success: function (data) {
						callbackFunction(data);
					}
				});
			},
			pasteSubcategories: function (collection, subcollection, callbackFunction) {
				var newCollection = new Store.Categories.Collections.CategoriesCollection();
				var categories = collection;
				_.forEach(collection.toJSON(), function (model) {
					var subcategoriesCollectin = new Store.Categories.Collections.SubcategoriesCollection();
					var el = _.filter(subcollection.toJSON(), function (submodel) {
						return model.id == submodel.parent_id;
					});
					subcategoriesCollectin.add(el);
					model.subcategories = subcategoriesCollectin;
					newCollection.push(model);
				});
				callbackFunction(newCollection);
			}
		});
	});

});