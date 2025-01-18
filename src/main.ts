import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: [`log`,'debug','error','verbose','warn','fatal']
  });

  app.useStaticAssets(join(__dirname, '..', 'public'));
  // app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // app.setViewEngine('hbs');


  app.setGlobalPrefix(`/api/v1`);

  // app.useStaticAssets(join(__dirname, '..', 'public'), {
  //   prefix: '/public/',
  // });

  app.enableCors();
  app.use(cookieParser());
  await app.listen(process.env.PORT || 3005);

  console.log(`
    SERVER RUNNING IN PORT ${process.env.PORT || 3005}
    `);
}
bootstrap();
