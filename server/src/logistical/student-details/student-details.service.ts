import { Injectable } from '@nestjs/common';
import { CreateStudentDetailDto } from './dto/create-student-detail.dto';
import { UpdateStudentDetailDto } from './dto/update-student-detail.dto';

import { StudentDetails, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StudentDetailsService {
  constructor(private prisma: PrismaService) {}

  async findAllStudentDetails(): Promise<StudentDetails[]> {
    return this.prisma.studentDetails.findMany();
  }

  async findOneStudentDetailById(id: string): Promise<StudentDetails> {
    return this.prisma.studentDetails.findUnique({
      where: { id },
    });
  }

  async findStudentDetailByUserId(userId: string): Promise<StudentDetails> {
    return this.prisma.studentDetails.findUnique({
      where: { userId },
    });
  }

  async findGroupIdsById(userId: string): Promise<string[]> {
    const studentDetails = await this.prisma.studentDetails.findUnique({
      where: { userId },
      select: {
        groupIds: true,
      },
    });
    
    return studentDetails.groupIds;
  }

  async findStudentByGroupId(groupId: string): Promise<StudentDetails[]> {
    return this.prisma.studentDetails.findMany({
      where: {
        groupIds: {
          has: groupId,
        },
      },
    });
  }

  async findUserIdById(id: string): Promise<string> {
    const studentDetails = await this.prisma.studentDetails.findUnique({
      where: { id },
      select: {
        userId: true,
      },
    });

    return studentDetails.userId;
  }

  async createStudentDetail(data: Prisma.StudentDetailsCreateInput): Promise<StudentDetails> {
    return this.prisma.studentDetails.create({
      data,
    });
  }

  async updateStudentDetail(id: string, data: Prisma.StudentDetailsUpdateInput): Promise<StudentDetails> {
    return this.prisma.studentDetails.update({
      where: { id },
      data,
    });
  }

  async updateStudentDetailByUserId(userId: string, data: Prisma.StudentDetailsUpdateInput): Promise<StudentDetails> {
    return this.prisma.studentDetails.update({
      where: { userId },
      data,
    });
  }

  async removeStudentDetail(id: string): Promise<StudentDetails> {
    return this.prisma.studentDetails.delete({
      where: { id },
    });
  }
}