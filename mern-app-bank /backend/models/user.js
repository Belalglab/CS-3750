const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: '' },
  savings: { type: Number, default: 0 },
  checking: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', userSchema);
