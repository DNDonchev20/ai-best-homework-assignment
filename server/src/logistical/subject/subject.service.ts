
import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

import { Subjects, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SubjectService {
  constructor(private prisma: PrismaService) {}

  async findAllSubjects(): Promise<Subjects[]> {
    return this.prisma.subjects.findMany();
  }

  async findOneSubjectById(id: string): Promise<Subjects> {
    return this.prisma.subjects.findUnique({
      where: { id },
    });
  }

  async createSubject(data: Prisma.SubjectsCreateInput): Promise<Subjects> {
    return this.prisma.subjects.create({
      data,
    });
  }

  async updateSubject(id: string, data: Prisma.SubjectsUpdateInput): Promise<Subjects> {
    return this.prisma.subjects.update({
      where: { id },
      data,
    });
  }

  async removeSubject(id: string): Promise<Subjects> {
    return this.prisma.subjects.delete({
      where: { id },
    });
  }
}
