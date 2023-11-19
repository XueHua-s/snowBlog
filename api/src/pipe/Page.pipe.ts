import { Injectable, PipeTransform } from '@nestjs/common';
import { PageDto } from '../dto/PageDto.dto';
@Injectable()
export class PagePipe implements PipeTransform {
  transform(value: PageDto): any {
    // console.log(value, '传递的值');
    value.current = Number(value.current);
    value.size = Number(value.size);
    return value;
  }
}
