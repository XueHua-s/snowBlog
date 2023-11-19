import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import {
  ResponseInterceptor,
  ResponseOverDto,
} from './interceptors/response.interceptor';
import { generateDocument } from './doc';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.setGlobalPrefix('api');
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HttpExceptionFilter(Logger, httpAdapterHost));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor(ResponseOverDto));
  if (process.env.NODE_ENV !== 'production') {
    // 接口文档
    generateDocument(app);
  }
  await app.listen(3001);
}
bootstrap();
