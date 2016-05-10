var mongoose = require('mongoose');

var ispModel = new mongoose.Schema({
	name: { type: String, required: true },
	plans: [
		{
			download: {
				speed: {type: Number},
				unit: {type: String, required: true}
			},
			upload: {
				speed: {type: Number},
				unit: {type: String, required: true}
			}
		}
	]
},
{
	collection : 'isps'
}
);
module.exports = mongoose.model('ispModel', ispModel);
