import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel('User') private userModel: Model<any>,
  ) {}

  async login(username: string, password: string) {
    const user = await this.userModel.findOne({ email: username });
    if (!user) throw new UnauthorizedException('Email không tồn tại');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Sai mật khẩu');

    const payload = { sub: user._id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        avatar: user.avatar,
        role: user.role,
      },
    };
  }

  async register(fullName: string, email: string, password: string, phone: string) {
    const existing = await this.userModel.findOne({ email });
    if (existing) throw new BadRequestException('Email đã tồn tại');

    const hashed = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({ fullName, email, password: hashed, phone });
    return { _id: user._id, email: user.email, fullName: user.fullName };
  }

  async getAccount(userId: string) {
    const user = await this.userModel.findById(userId).select('-password');
    return { user };
  }
}