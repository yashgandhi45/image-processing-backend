const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  requestId: String,
  status: String,
  createdAt: { type: Date, default: Date.now },
  webhookUrl: String
});

module.exports = mongoose.model('Request', RequestSchema);
