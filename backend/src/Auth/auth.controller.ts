import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

// Move DTO definition outside the controller
interface CreateUserDto {
  userName: string;
  email: string;
  password: string;
}
interface loginUserDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return await this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: loginUserDto) {
    return await this.authService.login(dto);
  }
}
