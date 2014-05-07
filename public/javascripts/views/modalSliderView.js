$(document).ready(function () {
	
	Store.module("Common.Views", function (Views, Store, Backbone, Marionette, $, _) {
		Views.ModalView = Marionette.ItemView.extend ({
			template: "#modalSlider",
			events: {
				'click .saveSliderChangesBtn'     : 'saveSliderChanges'
			},
			saveSliderChanges: function () {
				
			}
		});
	});

});