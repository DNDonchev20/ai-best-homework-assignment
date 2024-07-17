import { Injectable } from '@nestjs/common';

import { Homeworks, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class HomeworkService {
  constructor(private prisma: PrismaService, readonly configService: ConfigService) {}

  async findAll(): Promise<Homeworks[]> {
    return this.prisma.homeworks.findMany();
  }

  async findOne(id: string): Promise<Homeworks> {
    return this.prisma.homeworks.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.HomeworksCreateInput): Promise<Homeworks> {
    return this.prisma.homeworks.create({
      data,
    });
  }

  async update(id: string, data: Prisma.HomeworksUpdateInput): Promise<Homeworks> {
    return this.prisma.homeworks.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Homeworks> {
    return this.prisma.homeworks.delete({
      where: { id },
    });
  }
}
