import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty({ message: 'title không được để trống' })
  title!: string;

  @IsNotEmpty({ message: 'content không được để trống' })
  content!: string;

  @IsOptional()
  image?: string;

  @IsOptional()
  author?: string;

  @IsOptional()
  userId?: string;

  @IsOptional()
  avatar?: string;
}
