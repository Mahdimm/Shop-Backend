import mongoose from 'mongoose';
import config from './config';

export default callback => {
  mongoose.Promise = global.Promise
  let connection = mongoose.connect(config.mongoURL, {
    useMongoClient: true,
  });
  callback(connection);
}
