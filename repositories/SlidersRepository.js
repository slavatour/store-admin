var pg = require('pg');
var path = require('path');
var fs = require('fs');
var DbRepository = require('./dbRepository');

exports.SlidersRepository = function (conString) {
	var self = {};
	var dbRepository = new DbRepository.dbRepository(conString);

	self.fetchSliders = function (callbackFunction) {
		var command = "SELECT * FROM slider;"
		dbRepository.detData(command, function (result) {
			var fileName = "slider"+result[0].id+".png";
			var folder = path.resolve(__dirname, "..", "public/images/temp/", fileName);
			var command = "SELECT lo_export(slider.img1, '"+folder+"') FROM slider;"
			dbRepository.detData(command);
			result[0].img = fileName;
			callbackFunction(result);
		});	
	},
	self.putSlider = function (model, file) {
		var command = "SELECT * FROM slider WHERE id='"+model.id+"';";
		dbRepository.detData(command, function (result) {
			if(result[0]) {
				for (key in model) {
					var command = "UPDATE slider SET "+key+" = '"+model[key]+"' WHERE id = "+model.id+";";
					dbRepository.detData(command);
				}
				if(file !== undefined && file.file !== undefined) {
					var command = "UPDATE slider SET img1 = lo_import('"+file.file.path+"') WHERE id = "+model.id+";"
					dbRepository.detData(command, function (result) {
						fs.unlink(file.file.path, function (err) {
							if(err){
								console.error('error delete tepl file', err);
							};
						});
					});
				};
			};
		});	
	},
	self.saveSlider = function (model, file) {
		var command = "INSERT INTO slider ()";
	}

	return self;
}