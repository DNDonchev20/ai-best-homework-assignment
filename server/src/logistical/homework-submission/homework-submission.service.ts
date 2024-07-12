import { Injectable } from '@nestjs/common';
import { CreateHomeworkSubmissionDto } from './dto/create-homework-submission.dto';
import { UpdateHomeworkSubmissionDto } from './dto/update-homework-submission.dto';
import { PrismaService } from 'src/prisma.service';

import { HomeworkSubmissions, Prisma } from '@prisma/client';

@Injectable()
export class HomeworkSubmissionService {
  constructor(private readonly prisma: PrismaService) {}

  async findlAllHomeworkSubmissions(): Promise<HomeworkSubmissions[]> {
    return this.prisma.homeworkSubmissions.findMany();
  }

  async findHomeworkSubmissionById(id: string): Promise<HomeworkSubmissions>{
    return this.prisma.homeworkSubmissions.findUnique({
      where: { id },
    });
  }

  async findHomeworkSubmissionByUserId(studentId: string): Promise<HomeworkSubmissions[]> {
    return this.prisma.homeworkSubmissions.findMany({
      where: { studentId },
    });
  }

  async findHomeworkSubmissionByHomeworkId(homeworkId: string): Promise<HomeworkSubmissions[]> {
    return this.prisma.homeworkSubmissions.findMany({
      where: { homeworkId },
    });
  }

  async createHomeworkSubmission(data: Prisma.HomeworkSubmissionsCreateInput): Promise<HomeworkSubmissions> {
    return this.prisma.homeworkSubmissions.create({
      data,
    });
  }

  async updateHomeworkSubmission(id: string, data: Prisma.HomeworkSubmissionsUpdateInput): Promise<HomeworkSubmissions> {
    return this.prisma.homeworkSubmissions.update({
      where: { id },
      data,
    });
  }

  async removeHomeworkSubmission(id: string): Promise<HomeworkSubmissions> {
    return this.prisma.homeworkSubmissions.delete({
      where: { id },
    });
  }
}
