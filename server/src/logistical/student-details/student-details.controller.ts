import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentDetailsService } from './student-details.service';
import { CreateStudentDetailDto } from './dto/create-student-detail.dto';
import { UpdateStudentDetailDto } from './dto/update-student-detail.dto';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('student-details')
@Controller('student-details')
export class StudentDetailsController {
  constructor(private readonly studentDetailsService: StudentDetailsService) {}

  @Get()
  @ApiOperation({summary: 'Get all student details'})
  @ApiResponse({status: 200, description: 'Return all student details.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  async findAllStudentDetails() {
    return this.studentDetailsService.findAllStudentDetails();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get student detail by id'})
  @ApiResponse({status: 200, description: 'Return student detail by id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  async findOneStudentDetailById(@Param('id') id: string) {
    return this.studentDetailsService.findOneStudentDetailById(id);
  }

  @Get('user/:userId')
  @ApiOperation({summary: 'Get student detail by user id'})
  @ApiResponse({status: 200, description: 'Return student detail by user id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  async findStudentDetailByUserId(@Param('userId') userId: string) {
    return this.studentDetailsService.findStudentDetailByUserId(userId);
  }

  @Post()
  @ApiOperation({summary: 'Create student detail'})
  @ApiResponse({status: 200, description: 'Create student detail.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  async createStudentDetail(@Body() createStudentDetailDto: CreateStudentDetailDto) {
    return this.studentDetailsService.createStudentDetail(createStudentDetailDto);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update student detail by id'})
  @ApiResponse({status: 200, description: 'Update student detail by id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  async updateStudentDetail(@Param('id') id: string, @Body() updateStudentDetailDto: UpdateStudentDetailDto) {
    return this.studentDetailsService.updateStudentDetail(id, updateStudentDetailDto);
  }
}
