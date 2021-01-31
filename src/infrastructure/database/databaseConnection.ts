import { MongoClient } from 'mongodb';
import AppConfig from '@main/config/appConfig';

export default async function connectToDatabase() {
  const mongoClient = new MongoClient(AppConfig.databaseConfiguration.mongoDbConnectionUrl, {
    useNewUrlParser: true,
  });
  await mongoClient.connect();
  return mongoClient.db('jamSession');
}
