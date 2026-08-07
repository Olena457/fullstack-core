import { Controller, Post, Body, UsePipes, Res, Req, UnauthorizedException } from '@nestjs/common';
import type { Response, Request } from 'express';
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

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies?.refreshToken as string | undefined;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const { refreshToken: newRefreshToken, accessToken } =
      await this.authService.refreshTokens(refreshToken);

    this.setRefreshTokenCookie(res, newRefreshToken);

    return { accessToken };
  }

  private setRefreshTokenCookie(res: Response, refreshToken: string) {
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }
}
