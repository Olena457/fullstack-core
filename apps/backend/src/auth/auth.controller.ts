import { Controller, Post, Body, UsePipes, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { registerSchema, loginSchema } from './schemas/auth.schema';
import { YupValidationPipe } from '../common/pipes/yup-validation.pipe';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @UsePipes(new YupValidationPipe(registerSchema))
  async register(@Body() registerDto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    const { refreshToken, ...userData } = await this.authService.register(registerDto);
    this.setRefreshTokenCookie(res, refreshToken);
    return userData;
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @UsePipes(new YupValidationPipe(loginSchema))
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { refreshToken, ...userData } = await this.authService.login(loginDto);
    this.setRefreshTokenCookie(res, refreshToken);
    return userData;
  }

  private setRefreshTokenCookie(res: Response, refreshToken: string) {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }
}
