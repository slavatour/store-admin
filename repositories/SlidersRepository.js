var pg = require('pg');
var path = require('path');
var fs = require('fs');
var DbRepository = require('./dbRepository');

exports.SlidersRepository = function (conString) {
	var self = {};
	var dbRepository = new DbRepository.dbRepository(conString);

	self.fetchSliders = function (callbackFunction) {
		var command = "SELECT * FROM slider;"
		dbRepository.actionData(command, function (result) {
			for (var i = 0; i < result.length; i++) {
				var fileName = result[i] ? "slider"+result[i].id+".png" : "";
				var folder = path.resolve(__dirname, "..", "public/images/temp/", fileName);
				var command = "SELECT lo_export(slider.img, '"+folder+"') FROM slider;"
				dbRepository.actionData(command);
				result[i] ? result[i].img_name = fileName : "";
			};
			console.log(result);
			callbackFunction(result);
		});	
	},
	self.putSlider = function (id, model, file) {
		var command = "SELECT * FROM slider WHERE id='"+id+"';";
		dbRepository.actionData(command, function (result) {
			if(result[0]) {
				for (key in model) {
					var command = "UPDATE slider SET "+key+" = '"+model[key]+"' WHERE id = "+id+";";
					dbRepository.actionData(command);
				}
				if(file !== undefined && file.file !== undefined) {
					var command = "UPDATE slider SET img = lo_import('"+file.file.path+"') WHERE id = "+id+";"
					dbRepository.actionData(command, function (result) {
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
		var command = "SELECT max(number) FROM slider;";
		dbRepository.actionData(command, function (result) {
			for(key in model) {
				if(model[key] === undefined) {
					model[key] = "";
				}
			}
			if(!result[0]) {
				model.number = 1;
			} else {
				model.number = 1*result[0].max+1;
			}
			var command = "INSERT INTO slider (number, name, description, url) VALUES ("+
				model.number+", '"+model.name+"', '"+model.description+"', '"+model.url+"')";
			dbRepository.actionData(command, function (result) {
				console.log(model);
			});
		});
	},
	self.deleteSlider = function (id) {
		var command = "DELETE FROM slider WHERE id="+id+";";
		dbRepository.actionData(command);
	}

	return self;
}