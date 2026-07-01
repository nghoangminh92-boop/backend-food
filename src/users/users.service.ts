import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private model: Model<User>) {}

  async register(dto: CreateUserDto) {
    const exists = await this.model.findOne({ email: dto.email });
    if (exists) {
      throw new BadRequestException('Email đã tồn tại trong hệ thống');
    }
    const hashed = await bcrypt.hash(dto.password, 10);
    return this.model.create({ ...dto, password: hashed });
  }

  async findAll(current: number, pageSize: number) {
    current = current > 0 ? current : 1;
    pageSize = pageSize > 0 ? pageSize : 10;
    const total = await this.model.countDocuments();
    const result = await this.model
      .find()
      .select('-password')
      .skip((current - 1) * pageSize)
      .limit(pageSize)
      .sort({ createdAt: -1 });
    return { meta: { current, pageSize, total, pages: Math.ceil(total / pageSize) }, result };
  }

  async update(dto: UpdateUserDto) {
    return this.model.updateOne({ _id: dto._id }, { ...dto });
  }

  async remove(id: string) {
    return this.model.deleteOne({ _id: id });
  }

  async findOne(email: string) {
    return this.model.findOne({ email });
  }
}