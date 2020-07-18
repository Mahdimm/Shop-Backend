import mongoose from 'mongoose'

let Schema = mongoose.Schema
const ColorSchema = new Schema({
  color1: String,
  color2: String,
  color3: String
});
const HardwareSchema = new Schema({
  dimensions: String,
  weight: String,
  cpu: String,
  cpuSeries: String,
  cpuModel: String,
  cpuCache: String,
  ram: String,
  ramModel: String,
  hardCapacity: String,
  graphicCard: String,
  graphicModel: String,
  gddr: String,
  screenResolution: String,
  ScreenType: String,
  batteryType: String,
  batteryMilli: String,
  os: String
});
const PicSchema = new Schema({
  pic_title: String,
  pic_slider1: String,
  pic_slider2: String,
  pic_slider3: String,
  pic_slider4: String,
  threeDOject: String,
  video: String
});
const PriceSchema = new Schema({
  price: Number,
  price_after_offer: Number,
  percent_offer: Number
});
const laptopSchema = new Schema({
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

module.exports = mongoose.model('Laptop', laptopSchema);
