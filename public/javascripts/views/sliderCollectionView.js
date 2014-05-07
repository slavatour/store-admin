$(document).ready(function () {
	
	Store.module("Slider.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.SlidersCollectionView = Backbone.Marionette.CompositeView.extend({
			template: '#templateSliderCompositeView',
			itemView: Store.Slider.Views.SliderModelView,
			itemViewContainer: "tbody",
			events: {
				"click .addSliderBtn"		: 		"addNewSlider"
			},
			addNewSlider: function (e) {
				
			}
		});
	});

});