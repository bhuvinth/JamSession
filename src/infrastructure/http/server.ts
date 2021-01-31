import 'reflect-metadata';

import { createExpressServer } from 'routing-controllers';

import AppConfig from '../../config/appConfig';
import jamController from './controllers/jamController';
import userController from './controllers/userController';

createExpressServer({
  routePrefix: '/api',
  controllers: [jamController, userController],
  defaultErrorHandler: true,
}).listen(AppConfig.serverPort, async () => {
  console.log(`App listening on the http://localhost:${AppConfig.serverPort}`);
});
