import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty({ message: 'postId không được để trống' })
  postId!: string;

  @IsNotEmpty({ message: 'content không được để trống' })
  content!: string;

  @IsOptional()
  user?: string;

  @IsOptional()
  userId?: string;

  @IsOptional()
  avatar?: string;
}
