import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  LoggerService,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    private logger: LoggerService,
    private httpAdapterHost: HttpAdapterHost,
  ) {}
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    // 响应和请求对象
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const response = ctx.getResponse();
    let msg = exception['response'] || '服务器错误';
    if (exception instanceof QueryFailedError) {
      msg = exception.message;
      if (exception.driverError.errno === 1062) {
        msg = '唯一索引冲突';
      }
    }
    response.status(status).json({
      code: status,
      data: null,
      message: msg,
    });
  }
}
