$(document).ready(function () {
	
	Store.module("Slider.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.SlidersCollectionView = Backbone.Marionette.CompositeView.extend({
			template: '#templateSliderCompositeView',
			itemView: Store.Slider.Views.SliderModelView,
			itemViewContainer: "tbody",
			events: {
				"click .addSliderBtn"				: 		"addNewSlider"
			},
			collectionEvents: {
				"change:number"			: 			"changeNumber"
			},
			addNewSlider: function (e) {
				var modal = new Store.Common.Views.ModalView({
					template: '#modalNewSlider'
				});
				Store.modalRegion.show(modal);
			},
			changeNumber: function (model) {
				var array = this.collection.toJSON();
				var previousValue = model._previousAttributes.number;
				var obj = model.toJSON();
				_.each(array, function (value) {
					if(obj.number == value.number) {
						if(obj.id != value.id) {
							var difference = (1*previousValue - 1*obj.number);
							value.number = 1*value.number + difference;
						}
					}
				});
				this.collection.reset(array);
				_.each(this.collection.models, function (model) {
					model.save();
				});
			}
		});
	});

});