import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PrismaService } from 'src/prisma.service';

import { Teachers, Prisma } from '@prisma/client';

@Injectable()
export class TeacherService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllTeachers(): Promise<Teachers[]> {
    return this.prisma.teachers.findMany();
  }

  async findOneTeacherById(id: string): Promise<Teachers> {
    return this.prisma.teachers.findUnique({
      where: { id },
    });
  }

  async findTeachersByGroupId(groupId: string): Promise<Teachers[]> {
    return this.prisma.teachers.findMany({
      where: { groupId },
    });
  }

  async findTeachersBySubjectId(subjectId: string): Promise<Teachers[]> {
    return this.prisma.teachers.findMany({
      where: { subjectId },
    });
  }

  async createTeacher(data: Prisma.TeachersCreateInput): Promise<Teachers> {
    return this.prisma.teachers.create({
      data,
    });
  }
  
  async updateTeacher(id: string, data: Prisma.TeachersUpdateInput): Promise<Teachers> {
    return this.prisma.teachers.update({
      where: { id },
      data,
    });
  }

  async removeTeacher(id: string): Promise<Teachers> {
    return this.prisma.teachers.delete({
      where: { id },
    });
  }
}