var mongoose = require('mongoose');
var Guest = require('./guest.model');

var attendeeSchema = new mongoose.Schema({
  _id: {type: Number, required: true},
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  student_number: {type: Number, required: true},
  grade_level: {type: Number, required: true},
  guest: {type: Guest, required: true},
  guestId: {type: Number, required: true},
  timestamp: {type: String, required: true},
  comment: {type: String}
});

module.exports = attendeeSchema;
