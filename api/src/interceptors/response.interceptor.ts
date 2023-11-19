import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Expose, plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
export class ResponseOverDto {
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  code: number;
  @Expose()
  @IsNotEmpty()
  data: any;
  @Expose()
  @IsNotEmpty()
  message: any;
}
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // const req = context.switchToHttp().getRequest();
    return next.handle().pipe(
      map((data) => {
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
