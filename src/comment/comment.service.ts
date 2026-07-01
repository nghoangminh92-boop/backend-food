  import { BadRequestException, Injectable, ForbiddenException } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model } from 'mongoose';
  import { CreateCommentDto } from './dto/create-comment.dto';
  import { UpdateCommentDto } from './dto/update-comment.dto';
  import { Comment } from './schemas/comment.schema';

  @Injectable()
  export class CommentService {
    constructor(@InjectModel(Comment.name) private model: Model<Comment>) {}

    create(dto: CreateCommentDto, user: any) {
      return this.model.create({
        ...dto,
        userId: user.userId,
        user: user.username,
        createdAt: new Date(),
      });
    }

    findByPost(postId: string) {
      return this.model
        .find({ postId })
        .select('postId content user userId avatar createdAt')
        .sort({ createdAt: -1 });
    }

    async update(dto: UpdateCommentDto, user: any) {
      const comment = await this.model.findById(dto._id);
      if (!comment) {
        throw new BadRequestException(
          `Comment với id = ${dto._id} không tồn tại trên hệ thống.`,
        );
      }
      if (comment.userId !== user.userId) {
        throw new ForbiddenException('Bạn không có quyền sửa bình luận này');
      }
      return this.model.updateOne({ _id: dto._id }, { ...dto });
    }

    async remove(id: string, user: any) {
      const comment = await this.model.findById(id);
      if (!comment) {
        throw new BadRequestException(
          `Comment với id = ${id} không tồn tại trên hệ thống.`,
        );
      }
      if (comment.userId !== user.userId) {
        throw new ForbiddenException('Bạn không có quyền xóa bình luận này');
      }
      return this.model.deleteOne({ _id: id });
    }
  }
