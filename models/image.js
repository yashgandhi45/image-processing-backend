const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  requestId: String,
  productName: String,
  inputUrl: String,
  outputUrl: String
});

module.exports = mongoose.model('Image', ImageSchema);
