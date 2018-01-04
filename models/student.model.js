var mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
   schoolid: Number,
   first_name: String,
   last_name: String,
   grade_level: Number,
   fines: Boolean
});

module.exports = mongoose.model('Student', studentSchema);