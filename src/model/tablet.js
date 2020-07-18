import mongoose from 'mongoose';
let Schema = mongoose.Schema;
const ColorSchema = new Schema({
  color1: String,
  color2: String,
  color3: String
});
const HardwareSchema = new Schema({
  simcard: String,
  weight: String,
  cpu: String,
  gpu: String,
  storage: String,
  ram: String,
  display_res: String,
  display_info: String,
  pixel: String,
  inch: String,
  network: String,
  front_camera: String,
  back_camera: String,
  batteryType: String,
  batteryMilli: String,
  os: String,
  os_version: String
});
const PicSchema = new Schema({
  pic_title: String,
  pic_slider1: String,
  pic_slider2: String,
  pic_slider3: String,
  pic_slider4: String,
  threeD_object: String,
  video: String
});
const PriceSchema = new Schema({
  price: Number,
  price_after_offer: Number,
  percent_offer: Number
});
const TebletSchema = new Schema({
  title: String,
  share: String,
  title_orginal: String,
  info: String,
  pics: PicSchema,
  color: ColorSchema,
  hardware: HardwareSchema,
  price: PriceSchema,
  buyed: Number,
  viewed: Number,
  products_id: Number
});

module.exports = mongoose.model('Tablet', TebletSchema);
