import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

import { port } from './constants';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('auth')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  app.enableCors();
  app.use(helmet());

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }  

  await app.listen(port, '0.0.0.0');
}

bootstrap();