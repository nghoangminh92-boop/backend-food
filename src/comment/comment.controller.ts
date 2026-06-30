import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
// @ts-ignore
import { Request as ExpressRequest } from 'express';
import { Public } from '../auth/public.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
@UseGuards(JwtAuthGuard)
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  create(@Body() dto: CreateCommentDto, @Request() req: ExpressRequest) {
    return this.commentService.create(dto, req.user);
  }

  @Public()
  @Get(':postId')
  findByPost(@Param('postId') postId: string) {
    return this.commentService.findByPost(postId);
  }

  @Put()
  update(@Body() dto: UpdateCommentDto, @Request() req: ExpressRequest) {
    return this.commentService.update(dto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: ExpressRequest) {
    return this.commentService.remove(id, req.user);
  }
}

