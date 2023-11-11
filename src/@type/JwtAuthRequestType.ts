import { Request } from 'express';
import { User } from '../user/entities/user.entity';
export interface JwtAuthRequestType extends Request {
  user: Partial<User>;
}
