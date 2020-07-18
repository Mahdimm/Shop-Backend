import mongoose from 'mongoose'

let Schema = mongoose.Schema

const BasketSchema = new Schema({
  picTitle: String,
  titleOriginal: String,
  title: String,
  cateId: String,
  userId: String,
  email: String,
  color: String,
  guarantee: String,
  productId: String,
  date: String,
  time: String,
  price: String,
  status: String
});

module.exports = mongoose.model('Basket', BasketSchema);
