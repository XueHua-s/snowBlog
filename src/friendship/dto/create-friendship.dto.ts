import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';

export class CreateFriendshipDto {
  id: number;
  @ApiProperty({
    title: '友链图标',
  })
  @IsString()
  @IsNotEmpty()
  icon: string;
  @ApiProperty({
    title: '友链名称',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    title: '链接',
  })
  @IsString()
  @IsNotEmpty()
  link: string;
  user: Partial<User>;
}
