import { Injectable } from '@nestjs/common';
import { CreateHomeworkSubmissionDto } from './dto/create-homework-submission.dto';
import { UpdateHomeworkSubmissionDto } from './dto/update-homework-submission.dto';
import { PrismaService } from 'src/prisma.service';
import { HomeworkSubmissions, Prisma } from '@prisma/client';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { awsAccessKey, awsSecretAccessKey, awsS3Region } from 'src/constants';

@Injectable()
export class HomeworkSubmissionService {
  private readonly s3Client = new S3Client({ 
    credentials: { 
      accessKeyId: awsAccessKey,
      secretAccessKey: awsSecretAccessKey
    },
    region: awsS3Region
  });

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

  async createHomeworkSubmission(createHomeworkSubmissionDto: CreateHomeworkSubmissionDto, file: Express.Multer.File): Promise<HomeworkSubmissions> {
    // Upload file to S3
    const bucketName = 'homework-uploader';
    const fileUrl = `https://${bucketName}.s3.${awsS3Region}.amazonaws.com/${file.originalname}`;

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: file.originalname,
        Body: file.buffer,
      })
    );

    // Create homework submission in the database
    const data: Prisma.HomeworkSubmissionsCreateInput = {
      ...createHomeworkSubmissionDto,
      filePath: fileUrl,
    };

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