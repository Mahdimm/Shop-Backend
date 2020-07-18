import mongoose from 'mongoose'

let Schema = mongoose.Schema

const UserSchema = new Schema({
  name: String,
  imageUrl: String,
  signDate: String,
  lastName: String,
  phoneNumber: String,
  email: String,
  password: String,
  lat: String,
  lon: String,
  address: String,
  deviceOS: String,
  deviceID: String,
  deviceModel: String,
});

module.exports = mongoose.model('User', UserSchema);
