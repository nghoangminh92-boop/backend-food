import { BadRequestException, Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './schemas/post.schema';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private model: Model<Post>) {}

 create(dto: CreatePostDto, user: any) {
  return this.model.create({
    ...dto,
    userId: user.userId,
    author: user.fullName,
    avatar: user.avatar || '',
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}


  async findOne(id: string) {
    const post = await this.model
      .findById(id)
      .select('_id title content image author userId avatar createdAt updatedAt');
    if (post) return post;
    throw new BadRequestException(
      `Post với id = ${id} không tồn tại trên hệ thống.`,
    );
  }

  async update(dto: UpdatePostDto, user: any) {
  const post = await this.model.findById(dto._id);
  if (!post) {
    throw new BadRequestException(`Post với id = ${dto._id} không tồn tại`);
  }
  if (post.userId !== user.userId && user.role !== 'ADMIN') {
    throw new ForbiddenException('Bạn không có quyền sửa bài viết này');
  }
  return this.model.updateOne({ _id: dto._id }, { ...dto, updatedAt: new Date() });
}

 async remove(id: string, user: any) {
  const post = await this.model.findById(id);
  if (!post) {
    throw new BadRequestException(`Post với id = ${id} không tồn tại`);
  }
  if (post.userId !== user.userId && user.role !== 'ADMIN') {
    throw new ForbiddenException('Bạn không có quyền xóa bài viết này');
  }
  return this.model.deleteOne({ _id: id });
}

  async findAll(current: number, pageSize: number) {
  current = current && current > 0 ? current : 1;
  pageSize = pageSize && pageSize > 0 ? pageSize : 10;

  const totalItems = await this.model.countDocuments();
  const totalPages = Math.ceil(totalItems / pageSize);
  const skip = (current - 1) * pageSize;

  const result = await this.model
    .find()
    .select('_id title content image author userId avatar createdAt updatedAt')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(pageSize);

  return {
    meta: {
      current,
      pageSize,
      pages: totalPages,
      total: totalItems,
    },
    result,
  };
}
}

