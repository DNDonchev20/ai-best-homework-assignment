import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StudentDetailsService } from './student-details.service';
import { CreateStudentDetailDto } from './dto/create-student-detail.dto';
import { UpdateStudentDetailDto } from './dto/update-student-detail.dto';

import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('student-details')
@Controller('student-details')
export class StudentDetailsController {
  constructor(private readonly studentDetailsService: StudentDetailsService) {}

  @Get()
  @ApiOperation({summary: 'Get all student details'})
  @ApiResponse({status: 200, description: 'Return all student details.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  @ApiBearerAuth()
  @Roles(Role.Admin)

  async findAllStudentDetails() {
    return this.studentDetailsService.findAllStudentDetails();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get student detail by id'})
  @ApiResponse({status: 200, description: 'Return student detail by id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  @ApiBearerAuth()
  @Roles(Role.Admin)

  async findOneStudentDetailById(@Param('id') id: string) {
    return this.studentDetailsService.findOneStudentDetailById(id);
  }

  @Get('user/:userId')
  @ApiOperation({summary: 'Get student detail by user id'})
  @ApiResponse({status: 200, description: 'Return student detail by user id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  @ApiBearerAuth()
  @Roles(Role.User, Role.Admin)

  async findStudentDetailByUserId(@Param('userId') userId: string) {
    return this.studentDetailsService.findStudentDetailByUserId(userId);
  }

  @Get('groupId/userId/:userId')
  @ApiOperation({summary: 'Get student detail by group id and user id'})
  @ApiResponse({status: 200, description: 'Return student detail by group id and user id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  @ApiBearerAuth()
  @Roles(Role.User, Role.Admin)

  async findStudentDetailByGroupIdAndUserId(@Param('userId') userId: string) {
    return this.studentDetailsService.findGroupIdsById(userId);
  }

  @Get('group/:groupId')
  @ApiOperation({summary: 'Get student details by group id'})
  @ApiResponse({status: 200, description: 'Return student details by group id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  @ApiBearerAuth()
  @Roles(Role.User, Role.Admin)

  async findStudentByGroupId(@Param('groupId') groupId: string) {
    return this.studentDetailsService.findStudentByGroupId(groupId);
  }

  @Get('userId/id/:id')
  @ApiOperation({summary: 'Get user id by student detail id'})
  @ApiResponse({status: 200, description: 'Return user id by student detail id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  @ApiBearerAuth()
  @Roles(Role.User, Role.Admin)

  async findUserIdById(@Param('id') id: string) {
    return this.studentDetailsService.findUserIdById(id);
  }

  @Post()
  @ApiOperation({summary: 'Create student detail'})
  @ApiResponse({status: 200, description: 'Create student detail.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  @ApiBearerAuth()
  @Roles(Role.Admin)
  
  async createStudentDetail(@Body() createStudentDetailDto: CreateStudentDetailDto) {
    return this.studentDetailsService.createStudentDetail(createStudentDetailDto);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update student detail by id'})
  @ApiResponse({status: 200, description: 'Update student detail by id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  @ApiBearerAuth()
  @Roles(Role.Admin)

  async updateStudentDetail(@Param('id') id: string, @Body() updateStudentDetailDto: UpdateStudentDetailDto) {
    return this.studentDetailsService.updateStudentDetail(id, updateStudentDetailDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete student detail by id'})
  @ApiResponse({status: 200, description: 'Delete student detail by id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  @ApiBearerAuth()
  @Roles(Role.Admin)

  async removeStudentDetail(@Param('id') id: string) {
    return this.studentDetailsService.removeStudentDetail(id);
  }
}