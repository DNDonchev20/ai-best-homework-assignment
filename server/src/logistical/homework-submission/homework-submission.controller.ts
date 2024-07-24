import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator } from '@nestjs/common';
import { HomeworkSubmissionService } from './homework-submission.service';
import { CreateHomeworkSubmissionDto } from './dto/create-homework-submission.dto';
import { UpdateHomeworkSubmissionDto } from './dto/update-homework-submission.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HomeworkSubmissions } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@ApiTags('homework-submission')
@Controller('homework-submission')
export class HomeworkSubmissionController {
  constructor(private readonly homeworkSubmissionService: HomeworkSubmissionService) {}

  @Get()
  @ApiOperation({ summary: 'Get all homework submissions' })
  @ApiResponse({ status: 200, description: 'Return all homework submissions.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async findAllHomeworkSubmissions(): Promise<HomeworkSubmissions[]> {
    return this.homeworkSubmissionService.findlAllHomeworkSubmissions();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get homework submission by id' })
  @ApiResponse({ status: 200, description: 'Return homework submission by id.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async findHomeworkSubmissionById(@Param('id') id: string): Promise<HomeworkSubmissions> {
    return this.homeworkSubmissionService.findHomeworkSubmissionById(id);
  }

  @Get('userId/:userId/homeworkId/:homeworkId')
  @ApiOperation({ summary: 'Get submission details by user id and homework id' })
  @ApiResponse({ status: 200, description: 'Return submission details by user id and homework id.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Not found.' })

  async getSubmissionDetailsByUserIdAndHomeworkId(@Param('userId') userId: string, @Param('homeworkId') homeworkId: string): Promise<HomeworkSubmissions> {
    return this.homeworkSubmissionService.getSubmissionDetailsByUserIdAndHomeworkId(userId, homeworkId);
  }

  @Get('id/userId/:userId/homeworkId/:homeworkId')
  @ApiOperation({ summary: 'Get submission id by user id and homework id' })
  @ApiResponse({ status: 200, description: 'Return submission id by user id and homework id.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Not found.' })

  async checkSubmissionExists(@Param('userId') userId: string, @Param('homeworkId') homeworkId: string): Promise<boolean> {
    return this.homeworkSubmissionService.checkSubmissionExists(userId, homeworkId);
  }

  @Get('student/:studentId')
  @ApiOperation({ summary: 'Get homework submission by student id' })
  @ApiResponse({ status: 200, description: 'Return homework submission by student id.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async findHomeworkSubmissionByUserId(@Param('studentId') studentId: string): Promise<HomeworkSubmissions[]> {
    return this.homeworkSubmissionService.findHomeworkSubmissionByUserId(studentId);
  }

  @Get('homework/:homeworkId')
  @ApiOperation({ summary: 'Get homework submission by homework id' })
  @ApiResponse({ status: 200, description: 'Return homework submission by homework id.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async findHomeworkSubmissionByHomeworkId(@Param('homeworkId') homeworkId: string): Promise<HomeworkSubmissions[]> {
    return this.homeworkSubmissionService.findHomeworkSubmissionByHomeworkId(homeworkId);
  }

  @Post()
  @ApiOperation({ summary: 'Create homework submission metadata' })
  @ApiResponse({ status: 200, description: 'Create homework submission metadata.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async createHomeworkSubmissionMetadata(
    @Body() createHomeworkSubmissionDto: CreateHomeworkSubmissionDto
  ): Promise<HomeworkSubmissions> {
    return this.homeworkSubmissionService.createHomeworkSubmissionMetadata(createHomeworkSubmissionDto);
  }

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadHomeworkSubmissionFile(
      @UploadedFile(new ParseFilePipe({
          validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 })],
      })) file: Express.Multer.File,
      @Body('submissionId') submissionId: string 
  ): Promise<HomeworkSubmissions> {
      return this.homeworkSubmissionService.uploadHomeworkSubmissionFile(submissionId, file);
  }

  @Post('file-path')
  @ApiOperation({ summary: 'Create homework submission file path' })
  @ApiResponse({ status: 200, description: 'Create homework submission file path.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Not found.' })

  async createHomeworkSubmissionFilePath(@Body() data: CreateHomeworkSubmissionDto): Promise<HomeworkSubmissions> {
    return this.homeworkSubmissionService.createHomeworkSubmissionFilePath(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update homework submission by id' })
  @ApiResponse({ status: 200, description: 'Update homework submission by id.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async updateHomeworkSubmission(@Param('id') id: string, @Body() updateHomeworkSubmissionDto: UpdateHomeworkSubmissionDto): Promise<HomeworkSubmissions> {
    return this.homeworkSubmissionService.updateHomeworkSubmission(id, updateHomeworkSubmissionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete homework submission by id' })
  @ApiResponse({ status: 200, description: 'Delete homework submission by id.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async removeHomeworkSubmission(@Param('id') id: string): Promise<HomeworkSubmissions> {
    return this.homeworkSubmissionService.removeHomeworkSubmission(id);
  }

  @Get(':id/file')
  @ApiOperation({ summary: 'Get file for a specific homework submission' })
  @ApiResponse({ status: 200, description: 'Return file URL for the homework submission.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async getFileForHomeworkSubmission(@Param('id') id: string): Promise<{ fileUrl: string }> {
    const submission = await this.homeworkSubmissionService.findHomeworkSubmissionById(id);
    return { fileUrl: submission.filePath };
  }
}