const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: String,
  description: String,
  type: String,
  img: String,
  price: Number
});

module.exports = mongoose.model('Product', productSchema);