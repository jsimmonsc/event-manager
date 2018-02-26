var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: String,
  currentToken: String,
  role: {
    type: String,
    enum: ['checker', 'seller', 'admin', 'super']
  }
});

module.exports = mongoose.model('User', userSchema);