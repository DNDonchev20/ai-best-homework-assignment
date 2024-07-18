import { Injectable } from '@nestjs/common';

import { UserService } from 'src/logistical/user/user.service';
import { JwtService } from '@nestjs/jwt';

import { jwtSecret } from 'src/constants';

import * as bcrypt from 'bcrypt';

import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateUserById(userId: string): Promise<any> {
    const user = await this.usersService.findUserById(userId);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    const access_token = this.jwtService.sign(payload, { expiresIn: '7d' });
    const refresh_token = this.generateRefreshToken(user.id);
    await this.usersService.updateRefreshToken(user.id, refresh_token);
    return { access_token, refresh_token, user };
  }

  async refreshTokens(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken, { secret: jwtSecret });
      const user = await this.usersService.findUserById(decoded.sub);

      if (!user || user.refreshToken !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const payload = { email: user.email, sub: user.id, role: user.role };
      const access_token = this.jwtService.sign(payload, { secret: jwtSecret, expiresIn: '7d' });
      const new_refresh_token = this.generateRefreshToken(user.id);
      await this.usersService.updateRefreshToken(user.id, new_refresh_token);
      return { access_token, refresh_token: new_refresh_token, user };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  generateRefreshToken(userId: string) {
    return this.jwtService.sign({ sub: userId }, { secret: jwtSecret, expiresIn: '30d' });
  }

  async validatePayload(payload: any) {
    return await this.usersService.findUserByEmail(payload.email);
  }
}