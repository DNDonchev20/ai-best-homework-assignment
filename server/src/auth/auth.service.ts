import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/logistical/user/user.service';
import * as bcrypt from 'bcrypt';
import { jwtSecret } from 'src/constants';

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

  async validateUserById(id: string): Promise<any> {
    return this.usersService.findUserById(id);
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id, role: user.role };
    const access_token = this.jwtService.sign(payload, { expiresIn: '7d' });
    const refresh_token = this.generateRefreshToken(user.id);
    await this.usersService.updateRefreshToken(user.id, refresh_token);
    return { access_token, refresh_token, user };
  }

  async refreshTokens(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken, { secret: jwtSecret });
      const user = await this.validateUserById(decoded.sub);

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
}
