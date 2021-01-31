import * as env from 'env-var';
import * as dotenvsafe from 'dotenv-safe';

dotenvsafe.config();
export default class AppConfig {
  public static databaseConfiguration = {
    mongoDbConnectionUrl: env
      .get('MONGO_DB_URL')
      .required()
      .asString(),
  };

  public static serverPort = env
    .get('PORT')
    .default(5000)
    .asIntPositive();
  
  public static currentUserSchemaVersion = 2;
}
