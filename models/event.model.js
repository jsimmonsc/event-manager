var mongoose = require('mongoose');
var Attendee = require('./attendee.model');

var eventSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: Date,
  sales: { type: Number, default: 0 },
  attendees: [Attendee]
});

module.exports = mongoose.model('Event', eventSchema);