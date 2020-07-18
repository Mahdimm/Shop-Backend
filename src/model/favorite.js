import mongoose from 'mongoose'

let Schema = mongoose.Schema

const favoriteSchema = new Schema({
  users_id: String,
  products_id: Number,
  cateId: String,
  title: String,
  title_orginal: String,
  pic_title: String

})

module.exports = mongoose.model('favorite', favoriteSchema);
