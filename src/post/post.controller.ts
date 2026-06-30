import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
// @ts-ignore
import { Request as ExpressRequest } from 'express';
import { Public } from '../auth/public.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@Controller('post')
@UseGuards(JwtAuthGuard)
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  create(@Body() dto: CreatePostDto, @Request() req: ExpressRequest) {
    return this.postService.create(dto, req.user);
  }

  @Public()
  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Put()
  update(@Body() dto: UpdatePostDto, @Request() req: ExpressRequest) {
    return this.postService.update(dto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: ExpressRequest) {
    return this.postService.remove(id, req.user);
  }
}
