var mongoose = require('mongoose');
var Attendee = require('./attendee.model');

var eventSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: { type: Date, default: Date.now},
  sales: { type: Number, default: 0 },
  attendees: [Attendee],
  requirements: {
    fines: Boolean,
    attendance: Boolean
  },
  eligible_grades: [Number],
  cost: Number
});

module.exports = mongoose.model('Event', eventSchema);
