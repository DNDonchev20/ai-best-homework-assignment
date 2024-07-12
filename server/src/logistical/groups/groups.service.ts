import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from 'src/prisma.service';

import { Groups, Prisma } from '@prisma/client';

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) {}

  async findAllGroups(): Promise<Groups[]> {
    return this.prisma.groups.findMany();
  }

  async findOneGroupById(id: string): Promise<Groups> {
    return this.prisma.groups.findUnique({
      where: { id },
    });
  }

  async createGroup(data: Prisma.GroupsCreateInput): Promise<Groups> {
    return this.prisma.groups.create({
      data,
    });
  }

  async updateGroup(id: string, data: Prisma.GroupsUpdateInput): Promise<Groups> {
    return this.prisma.groups.update({
      where: { id },
      data,
    });
  }

  async removeGroup(id: string): Promise<Groups> {
    return this.prisma.groups.delete({
      where: { id },
    });
  }
}
