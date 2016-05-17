var mongoose = require('mongoose');

var ispModel = new mongoose.Schema({
	name: { type: String, required: true },
	plans: [
		{
			region: {
				city: {type: String, required: true},
				state: {type: String, required: true}
			},
			download: {
				speed: {type: Number, required: true},
				unit: {type: String, required: true}
			},
			upload: {
				speed: {type: Number, required: true},
				unit: {type: String, required: true}
			}
		}
	]
},
{
	collection : 'isps'
});
module.exports = mongoose.model('ispModel', ispModel);
