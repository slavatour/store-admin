$(document).ready(function () {
	
	var StoreRouter = Backbone.Marionette.AppRouter.extend({
		routes: {
			"" 						: "index",
			"/" 					: "index",
			"categories" 			: "showCategories",
			"products" 				: "showProducts",
			"slider"				: "showSliderEdit", 

		},
		index: function () {
			$('.contentContainer > div').css('display', 'none');
			$('.indexContainer').css('display', 'block');
		},
		showCategories: function () {
			$('.contentContainer > div').css('display', 'none');
			$('#categoriesContainer').fadeIn();

			var subcategoriesController = new Store.Categories.Controllers.SubcategoriesController();
			// subcategoriesController();

			var categoriesCollection = new Store.Categories.Collections.CategoriesCollection();
			var subcategoriesCollection = new Store.Categories.Collections.SubcategoriesCollection();

			var viewCategoriesListController = new Store.Categories.Controllers.ViewCategoriesListController({
				regions: Store.categoriesRegion,
				collection: categoriesCollection,
				subcollection: subcategoriesCollection
			});

			viewCategoriesListController.fetchCategories(function (collection) {
				viewCategoriesListController.fetchSubcategories(function (subcollection) {
					viewCategoriesListController.pasteSubcategories(collection, subcollection, function (collectionReady) {
						var categoriesCollectionView = new Store.Categories.Views.CategoryCollectionView({
							collection: collectionReady
						});
						var loading = new Store.Common.Views.Loading();
						Store.categoriesRegion.show(loading);
						setTimeout(function () {
							Store.categoriesRegion.show(categoriesCollectionView);
						},1000);
					});
				});

				
			});
			
		},
		showProducts: function () {
			$('.contentContainer > div').css('display', 'none');
			$('.productsContainer').css('display', 'block');
		},
		showSliderEdit: function () {
			$('.contentContainer > div').css('display', 'none');
			$('.sliderContainer').css('display', 'block');
			var sliderController = new Store.Slider.Controllers.SliderController();
			sliderController.renderView();
		}
	});
	var storeRouter = new StoreRouter();
});