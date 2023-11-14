import { Injectable, PipeTransform } from '@nestjs/common';
@Injectable()
export class AllotRolePipe implements PipeTransform {
  transform(value: any) {
    if (
      value.permissions &&
      value.permissions instanceof Array &&
      value.permissions.length > 0
    ) {
      if (value.permissions[0]['id']) {
        value.permissions = value.roles.map((item) => ({
          id: item.id,
        }));
      } else if (typeof value.permissions[0] === 'number') {
        value.permissions = value.permissions.map((item) => ({
          id: item,
        }));
      }
    }
    return value;
  }
}
