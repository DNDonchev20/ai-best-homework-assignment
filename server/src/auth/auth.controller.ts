import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/is_public.decorator';
import { AuthGuard } from '@nestjs/passport';

import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @HttpCode(200)
  @Post('login')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully logged in.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string', format: 'password' },
      },
    },
  })

  async login(@Body() user: any) {
    return this.authService.login(user);
  }

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh tokens' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tokens refreshed successfully.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        refreshToken: { type: 'string' },
      },
    },
  })
  async refresh(@Request() refreshDto) {
    return this.authService.refreshTokens(refreshDto.refreshToken);
  }

  //must have auth guard
  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Profile retrieved successfully.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.',
  })
  async getProfile(@Request() req) {
    return req.user;
  }
}