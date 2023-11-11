import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export default () => {
  return UseGuards(AuthGuard('jwt'));
};
