import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

import { port } from './constants';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  app.use(helmet());

  await app.listen(port, '0.0.0.0');

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }  
}
bootstrap();