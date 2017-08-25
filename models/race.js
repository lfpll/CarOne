var mongoose = require('mongoose');

var raceSchema = new mongoose.Schema
({ 
	origin: String,
  	destination: String,
  	userId: Array,
  	waypoints: Array,
  	driverId: String,
  	images: Array,
  });

module.exports = mongoose.model('Race',raceSchema);