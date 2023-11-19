import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiHeader } from '@nestjs/swagger';

export default () => {
  return UseGuards(AuthGuard('jwt'));
};
export function JwtSwaggerAuthHeader() {
  return ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  });
}
