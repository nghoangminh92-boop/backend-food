import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  _id!: string;

  @IsNotEmpty()
  fullName!: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  avatar?: string;
}