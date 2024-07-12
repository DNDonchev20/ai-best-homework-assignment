import { Injectable } from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';

import { Grades, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GradeService {
  constructor(private prisma: PrismaService) {}

  async findAllGrades(): Promise<Grades[]> {
    return this.prisma.grades.findMany();
  }

  async findOneGradeById(id: string): Promise<Grades> {
    return this.prisma.grades.findUnique({
      where: { id },
    });
  }

  async findGradeByStudentId(studentId: string): Promise<Grades[]> {
    return this.prisma.grades.findMany({
      where: { studentId },
    });
  }

  async findGradeByHomeworkSubmissionId(homeworkSubmissionId: string): Promise<Grades> {
    return this.prisma.grades.findUnique({
      where: { homeworkSubmissionId },
    });
  }

  async createGrade(data: Prisma.GradesCreateInput): Promise<Grades> {
    return this.prisma.grades.create({
      data,
    });
  }

  async updateGrade(id: string, data: Prisma.GradesUpdateInput): Promise<Grades> {
    return this.prisma.grades.update({
      where: { id },
      data,
    });
  }

  async updateGradeByHomeworkSubmissionId(homeworkSubmissionId: string, data: Prisma.GradesUpdateInput): Promise<Grades> {
    return this.prisma.grades.update({
      where: { homeworkSubmissionId },
      data,
    });
  }

  async removeGrade(id: string): Promise<Grades> {
    return this.prisma.grades.delete({
      where: { id },
    });
  }
}
