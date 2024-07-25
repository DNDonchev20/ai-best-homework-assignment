import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GradeService } from './grade.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';

import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('grade')
@Controller('grade')
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @Get()
  @ApiOperation({summary: 'Get all grades'})
  @ApiResponse({status: 200, description: 'Return all grades.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  @ApiBearerAuth()
  @Roles(Role.Admin)

  async findAllGrades() {
    return this.gradeService.findAllGrades();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get grade by id'})
  @ApiResponse({status: 200, description: 'Return grade by id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  @ApiBearerAuth()
  @Roles(Role.Teacher, Role.Admin)

  async findOneGradeById(@Param('id') id: string) {
    return this.gradeService.findOneGradeById(id);
  }
  
  @Get('homeworkSubmission/:homeworkSubmissionId')
  @ApiOperation({summary: 'Get grade by homework submission id'})
  @ApiResponse({status: 200, description: 'Return grade by homework submission id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})

  @ApiBearerAuth()
  @Roles(Role.User, Role.Admin)

  async findGradeByHomeworkSubmissionId(@Param('homeworkSubmissionId') homeworkSubmissionId: string) {
    return this.gradeService.findGradeByHomeworkSubmissionId(homeworkSubmissionId);
  }

  @Get('homeworkSubmission/:homeworkSubmissionId/student/:studentId')
  @ApiOperation({summary: 'Get grade by homework submission id and student id'})
  @ApiResponse({status: 200, description: 'Return grade by homework submission id and student id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})

  @ApiBearerAuth()
  @Roles(Role.Teacher, Role.Admin)
  
  async findGradeByHomeworkSubmissionIdAndStudentId(@Param('homeworkSubmissionId') homeworkSubmissionId: string, @Param('studentId') studentId: string) {
    return this.gradeService.findGradeByHomeworkSubmissionIdAndStudentId(homeworkSubmissionId, studentId);
  }

  @Post()
  @ApiOperation({summary: 'Create grade'})
  @ApiResponse({status: 200, description: 'Create grade.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  @ApiBearerAuth()
  @Roles(Role.Teacher, Role.Admin)

  async createGrade(@Body() createGradeDto: CreateGradeDto) {
    return this.gradeService.createGrade(createGradeDto);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update grade by id'})
  @ApiResponse({status: 200, description: 'Update grade by id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  @ApiBearerAuth()
  @Roles(Role.Admin)

  async updateGrade(@Param('id') id: string, @Body() updateGradeDto: UpdateGradeDto) {
    return this.gradeService.updateGrade(id, updateGradeDto);
  }

  @Patch('homeworkSubmission/:homeworkSubmissionId')
  @ApiOperation({summary: 'Update grade by homework submission id'})
  @ApiResponse({status: 200, description: 'Update grade by homework submission id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  @ApiBearerAuth()
  @Roles(Role.Teacher, Role.Admin)

  async updateGradeByHomeworkSubmissionId(@Param('homeworkSubmissionId') homeworkSubmissionId: string, @Body() updateGradeDto: UpdateGradeDto) {
    return this.gradeService.updateGradeByHomeworkSubmissionId(homeworkSubmissionId, updateGradeDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete grade by id'})
  @ApiResponse({status: 200, description: 'Delete grade by id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  @ApiBearerAuth()
  @Roles(Role.Teacher, Role.Admin)

  async deleteGrade(@Param('id') id: string) {
    return this.gradeService.removeGrade(id);
  }
}