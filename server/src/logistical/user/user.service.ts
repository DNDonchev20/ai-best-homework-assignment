import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

import { Users, Prisma } from '@prisma/client';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Users[]> {
    return this.prisma.users.findMany();
  }

  async findUserById(id: string): Promise<Users> {
    return this.prisma.users.findUnique({
      where: { id },
    });
  }

  async findUserByEmail(email: string): Promise<Users> {
    return this.prisma.users.findUnique({
      where: { email },
    });
  }

  async findIdByEmail(email: string): Promise<string> {
    const user = await this.prisma.users.findUnique({
      where: { email },
    });
    return user.id;
  }

  async createUser(data: Prisma.UsersCreateInput): Promise<Users> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    return this.prisma.users.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  async updateUser(id: string, data: Prisma.UsersUpdateInput): Promise<Users> {
    return this.prisma.users.update({
      where: { id },
      data,
    });
  }

  async removeUser(id: string): Promise<Users> {
    return this.prisma.users.delete({
      where: { id },
    });
  }

  //refresh token methods

  async updateRefreshToken(userId: string, refreshToken: string): Promise<void> {
    await this.prisma.users.update({
      where: { id: userId },
      data: { refreshToken },
    });
  }

  async logoutUser(userId: string): Promise<void> {
    await this.prisma.users.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }
}