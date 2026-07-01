import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  fullName!: string;

  @IsEmail()
  email!: string;

  @IsNotEmpty()
  password!: string;

  @IsOptional()
  phone?: string;
}