import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rating } from './schemas/rating.schema';
import { CreateRatingDto } from './dto/create-rating.dto';

@Injectable()
export class RatingService {
  constructor(@InjectModel(Rating.name) private model: Model<Rating>) {}

  async ratePost(dto: CreateRatingDto, user: any) {
    const existing = await this.model.findOne({ postId: dto.postId, userId: user.userId });
    if (existing) {
      await this.model.updateOne({ _id: existing._id }, { star: dto.star });
    } else {
      await this.model.create({ ...dto, userId: user.userId, createdAt: new Date() });
    }
    return this.getPostRating(dto.postId);
  }

  async getPostRating(postId: string) {
    const ratings = await this.model.find({ postId });
    const total = ratings.length;
    const avg = total > 0 ? ratings.reduce((sum, r) => sum + r.star, 0) / total : 0;
    return { postId, average: Math.round(avg * 10) / 10, total };
  }

  async getUserRating(postId: string, userId: string) {
    const rating = await this.model.findOne({ postId, userId });
    return { star: rating?.star || 0 };
  }
}