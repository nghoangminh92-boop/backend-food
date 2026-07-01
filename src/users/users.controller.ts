import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Public } from '../auth/public.decorator';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.usersService.register(dto);
  }

  @Public()
  @Get()
  findAll(
    @Query('current') current: string,
    @Query('pageSize') pageSize: string,
  ) {
    return this.usersService.findAll(+current, +pageSize);
  }

  @Public()
  @Put()
  update(@Body() dto: UpdateUserDto) {
    return this.usersService.update(dto);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}