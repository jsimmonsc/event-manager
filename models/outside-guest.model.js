var mongoose = require('mongoose');

var outsideGuestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  school: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: Number, required: true }
});

module.exports = outsideGuestSchema;