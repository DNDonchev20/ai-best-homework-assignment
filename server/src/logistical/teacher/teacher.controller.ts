import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('teacher')
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get()
  @ApiOperation({summary: 'Get all teachers'})
  @ApiResponse({status: 200, description: 'Return all teachers.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  async findAllTeachers() {
    return this.teacherService.findAllTeachers();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get teacher by id'})
  @ApiResponse({status: 200, description: 'Return teacher by id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  async findOneTeacherById(@Param('id') id: string) {
    return this.teacherService.findOneTeacherById(id);
  }

  @Get('group/:groupId')
  @ApiOperation({summary: 'Get teachers by group id'})
  @ApiResponse({status: 200, description: 'Return teachers by group id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  async findTeachersByGroupId(@Param('groupId') groupId: string) {
    return this.teacherService.findTeachersByGroupId(groupId);
  }

  @Get('subject/:subjectId')
  @ApiOperation({summary: 'Get teachers by subject id'})
  @ApiResponse({status: 200, description: 'Return teachers by subject id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  async findTeachersBySubjectId(@Param('subjectId') subjectId: string) {
    return this.teacherService.findTeachersBySubjectId(subjectId);
  }

  @Post()
  @ApiOperation({summary: 'Create teacher'})
  @ApiResponse({status: 200, description: 'Create teacher.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  async createTeacher(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.createTeacher(createTeacherDto);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update teacher by id'})
  @ApiResponse({status: 200, description: 'Update teacher by id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})

  async updateTeacher(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teacherService.updateTeacher(id, updateTeacherDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete teacher by id'})
  @ApiResponse({status: 200, description: 'Delete teacher by id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  async deleteTeacher(@Param('id') id: string) {
    return this.teacherService.removeTeacher(id);
  }
}
