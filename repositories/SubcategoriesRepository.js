var pg = require('pg');

exports.SubcategoriesRepository = function (conString) {
	var self = {};

	self.fetchSubcategories = function (id, attr, callbackFunction) {
		if(id === 'all') {
			var command = "SELECT * FROM subcategories;";
		} else {
			var command = "SELECT * FROM subcategories WHERE "+attr+"="+id+";";
		}
		workWithDB(command, callbackFunction)
	};
	self.deleteSubcategory = function (id) {
		var command = "DELETE FROM subcategories WHERE id='"+id+"';";
		workWithDB(command);
	};
	workWithDB = function (command, callbackFunction) {
		var client = new pg.Client(conString);
		client.connect(function (err) {
			if(err) {
				return console.error('could not connect to pg', err);
			}
			
			client.query(command, function (err, result) {
				if(err) {
					return console.error('error running query', err);
				}
				if(callbackFunction) {
					callbackFunction(result.rows);
				}
				client.end();
			});
		});
	}

	return self;
}

