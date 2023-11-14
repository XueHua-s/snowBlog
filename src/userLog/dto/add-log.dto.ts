import { User } from '../../user/entities/user.entity';

export class AddLogDto {
  action: string;
  record: string;
  user: Partial<User>;
}
