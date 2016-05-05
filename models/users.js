var mongoose = require('mongoose');

var userModel = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, default: '' }
},
{
	collection : 'users'
}
);

module.exports = mongoose.model('userModel', userModel);
