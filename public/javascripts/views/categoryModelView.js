$(document).ready(function () {

	Store.module("Categories.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.CategoryModelView = Backbone.Marionette.ItemView.extend({
			template: '#categoriesModelTemplate',
			initialize: function () {
				
			},
			templateHelpers: {
				viewSubcategories: function () {
					// var content = "";
					// if(this.subcategories) {
					// 	_.each( this.subcategories.toJSON(), function (model) {
					// 		content += "<a class='subcategoriesLink' data-toggle='modal'"+
					// 		" data-target='.bs-example-modal-lg' data-submodel-id='"+
					// 		model.id+"'>"+model.name;
					// 	});	
					// } else {
					// 	content = 'There are no any subcategories in this category.';
					// }
					// return content;
					// console.log(this.subcategories);
				}
			},
			onRender: function () {
				
			},
			events: {
				'click .subcategoriesLink': 'openModal'
			},
			openModal: function (e) {
				var modelId = 1*($(e.target).attr('data-submodel-id'));
				var subcategories = this.model.get('subcategories');
				var openedModel = _.where(subcategories, {id: modelId});
				var submodel = new Store.Categories.Models.SubcategoryModel();
				submodel.set(openedModel[0]);
				var modalView = new Store.Common.Views.ModalView({
					model: submodel
				});
				Store.modalRegion.show(modalView);
			},
			change: function () {
				console.log('model changed!');
			}
		});
	});

});