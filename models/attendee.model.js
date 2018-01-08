var mongoose = require('mongoose');

var attendeeSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  student_number: Number,
  grade_level: Number,
  guest: String,
  guestId: Number,
  timestamp: String
});

module.exports = attendeeSchema;