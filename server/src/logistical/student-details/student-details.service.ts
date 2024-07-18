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