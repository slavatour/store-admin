var pg = require('pg');
var DbRepository = require('./dbRepository');

exports.SubcategoriesRepository = function (conString) {
	var self = {};
	var dbRepository = new DbRepository.dbRepository(conString);

	self.fetchSubcategories = function (id, attr, callbackFunction) {
		if(id === 'all') {
			var command = "SELECT * FROM subcategories;";
		} else {
			var command = "SELECT * FROM subcategories WHERE "+attr+"="+id+";";
		}
		dbRepository.actionData(command, callbackFunction)
	};
	self.deleteSubcategory = function (id) {
		var command = "DELETE FROM subcategories WHERE id='"+id+"';";
		dbRepository.actionData(command);
	};

	return self;
}

