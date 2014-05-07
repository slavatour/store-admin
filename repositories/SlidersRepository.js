var pg = require('pg');
var DbRepository = require('./dbRepository');

exports.SlidersRepository = function (conString) {
	var self = {};
	var dbRepository = new DbRepository.dbRepository(conString);

	self.fetchSliders = function (callbackFunction) {
		var command = "SELECT * FROM slider;"
		dbRepository.detData(command, callbackFunction);	
	},
	self.putSlider = function (model) {
		var command = "SELECT * FROM slider WHERE id='"+model.id+"';";
		dbRepository.detData(command, function (result) {
			if(result[0]) {
				console.log('model', model);
				console.log('result', result);
				for (key in model) {
					var command = "UPDATE slider SET "+key+" = '"+model.key+"' WHERE id = '"+model.id+"';";
					dbRepository.detData(command);
					console.log('command', command);
				}
			} else {
				var error = new Error("Such model doesn't exist!");
				return error;
			}
		});	
	}

	return self;
}