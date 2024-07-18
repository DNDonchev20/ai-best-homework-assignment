import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GradeService } from './grade.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('grade')
@Controller('grade')
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @Get()
  @ApiOperation({summary: 'Get all grades'})
  @ApiResponse({status: 200, description: 'Return all grades.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  async findAllGrades() {
    return this.gradeService.findAllGrades();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get grade by id'})
  @ApiResponse({status: 200, description: 'Return grade by id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  async findOneGradeById(@Param('id') id: string) {
    return this.gradeService.findOneGradeById(id);
  }

  @Get('student/:studentId')
  @ApiOperation({summary: 'Get grade by student id'})
  @ApiResponse({status: 200, description: 'Return grade by student id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})

  async findGradeByStudentId(@Param('studentId') studentId: string) {
    return this.gradeService.findGradeByStudentId(studentId);
  }

  @Get('homeworkSubmission/:homeworkSubmissionId')
  @ApiOperation({summary: 'Get grade by homework submission id'})
  @ApiResponse({status: 200, description: 'Return grade by homework submission id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})

  async findGradeByHomeworkSubmissionId(@Param('homeworkSubmissionId') homeworkSubmissionId: string) {
    return this.gradeService.findGradeByHomeworkSubmissionId(homeworkSubmissionId);
  }

  @Post()
  @ApiOperation({summary: 'Create grade'})
  @ApiResponse({status: 200, description: 'Create grade.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  async createGrade(@Body() createGradeDto: CreateGradeDto) {
    return this.gradeService.createGrade(createGradeDto);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update grade by id'})
  @ApiResponse({status: 200, description: 'Update grade by id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  async updateGrade(@Param('id') id: string, @Body() updateGradeDto: UpdateGradeDto) {
    return this.gradeService.updateGrade(id, updateGradeDto);
  }

  @Patch('homeworkSubmission/:homeworkSubmissionId')
  @ApiOperation({summary: 'Update grade by homework submission id'})
  @ApiResponse({status: 200, description: 'Update grade by homework submission id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  async updateGradeByHomeworkSubmissionId(@Param('homeworkSubmissionId') homeworkSubmissionId: string, @Body() updateGradeDto: UpdateGradeDto) {
    return this.gradeService.updateGradeByHomeworkSubmissionId(homeworkSubmissionId, updateGradeDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete grade by id'})
  @ApiResponse({status: 200, description: 'Delete grade by id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  async deleteGrade(@Param('id') id: string) {
    return this.gradeService.removeGrade(id);
  }
}