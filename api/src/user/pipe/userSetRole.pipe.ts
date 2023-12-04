import { Injectable, PipeTransform } from '@nestjs/common';
import { UserSetRoleDto } from '../dto/userSetRole.dto';
@Injectable()
export class UserSetRolePipe implements PipeTransform {
  transform(value: UserSetRoleDto): any {
    if (typeof value.roles[0] === 'object') {
      return {
        ...value,
        roles: value.roles.map((val) => ({
          id: val.id,
        })),
      };
    }
    return {
      ...value,
      roles: value.roles.map((val) => ({
        id: val,
      })),
    };
  }
}
