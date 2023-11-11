import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
export class SigninUserDto {
  @ApiProperty({
    example: 'test',
    maxLength: 20,
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 20, {
    // $constraint 参数
    // $target 当前类
    // $property 当前属性名
    // $value 用户当前传入值
    message:
      '用户名的长度必须在$constraint1到$constraint1之间，当前值为: $value',
  })
  username: string;
  @ApiProperty({
    example: 'test',
    maxLength: 20,
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
