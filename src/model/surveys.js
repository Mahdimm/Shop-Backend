import mongoose from 'mongoose'

let Schema = mongoose.Schema

const surveysSchema = new Schema({
  productId: String,
  score: String,
  comment: String,
  users_id: String,
  profile_image: String
});

module.exports = mongoose.model('Surveys', surveysSchema);
