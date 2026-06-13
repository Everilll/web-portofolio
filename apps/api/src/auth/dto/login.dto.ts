import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin@gmail.com', description: 'Email akun admin' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password', description: 'Kata sandi admin' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
