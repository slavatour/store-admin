$(document).ready(function () {
	
	Store.module("Slider.Collections", function (Collections, Store, Backbone, Marionette, $, _) {
		Collections.SlidersCollection = Backbone.Collection.extend({
			model: Store.Slider.Models.SliderModel,
			url: "slider"
		});
	});

});