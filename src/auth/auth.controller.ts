import { Controller, Post, Body, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() body: { username: string; password: string }) {
    return this.authService.login(body.username, body.password);
  }

  @Public()
  @Post('register')
  register(@Body() body: { fullName: string; email: string; password: string; phone: string }) {
    return this.authService.register(body.fullName, body.email, body.password, body.phone);
  }

  @Get('account')
  getAccount(@Request() req: any) {
    return this.authService.getAccount(req.user.userId);
  }

  @Public()
  @Post('logout')
  logout() {
    return { message: 'Logout thành công' };
  }
}