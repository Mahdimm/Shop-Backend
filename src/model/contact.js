import mongoose from 'mongoose'
let Schema = mongoose.Schema

const contactSchema = new Schema ({
  email: String,
  title: String,
  text: String
})

const contactMain = new Schema ({
  comment: contactSchema
})

module.exports = mongoose.model('Contact', contactMain);
