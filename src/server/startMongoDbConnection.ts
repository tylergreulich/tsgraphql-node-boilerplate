import * as winston from 'winston';
import * as mongoose from 'mongoose';
import { keys } from '../../config/keys';

const createMongooseConnection = () => {
  mongoose.connect(
    process.env.MONGODB_URI || keys.MONGO_TEST,
    { useNewUrlParser: true }
  );
};

export const startMongoDbConnection = async () => {
  try {
    await createMongooseConnection();
    winston.info('Connected to MongoDB');
  } catch (error) {
    winston.error(error);
  }
};
