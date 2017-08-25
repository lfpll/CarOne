var mongoose = require ("mongoose");

var commentSchema = new mongoose.Schema({
	username: String,
	text: String
	});

module.exports = mongoose.model('Comment',commentSchema);