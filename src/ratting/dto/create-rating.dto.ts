import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @IsNotEmpty()
  postId!: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  star!: number;
}