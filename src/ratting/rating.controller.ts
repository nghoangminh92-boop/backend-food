import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Public } from '../auth/public.decorator';

@Controller('rating')
@UseGuards(JwtAuthGuard)
export class RatingController {
  constructor(private ratingService: RatingService) {}

  @Post()
  rate(@Body() dto: CreateRatingDto, @Request() req: any) {
    return this.ratingService.ratePost(dto, req.user);
  }

  @Public()
  @Get(':postId')
  getPostRating(@Param('postId') postId: string) {
    return this.ratingService.getPostRating(postId);
  }

  @Get(':postId/user')
  getUserRating(@Param('postId') postId: string, @Request() req: any) {
    return this.ratingService.getUserRating(postId, req.user.userId);
  }
}