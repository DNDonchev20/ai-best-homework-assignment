import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { HomeworkService } from './homework.service';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';

import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Homeworks } from '@prisma/client';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('homework')
@Controller('homework')
export class HomeworkController {
  constructor(private readonly homeworkService: HomeworkService) {}

  @Get()
  @ApiOperation({summary: 'Get all homeworks'})
  @ApiResponse({status: 200, description: 'Return all homeworks.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  @ApiBearerAuth()
  @Roles(Role.Admin)

  async findAllHomeworks(): Promise<Homeworks[]> {
    return this.homeworkService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get homework by id'})
  @ApiResponse({status: 200, description: 'Return homework by id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  @ApiBearerAuth()
  @Roles(Role.User, Role.Teacher, Role.Admin)

  async findOneHomework(@Param('id') id: string): Promise<Homeworks> {
    return this.homeworkService.findOne(id);
  }

  @Get('teacher/:teacherId')
  @ApiOperation({summary: 'Get homeworks by teacher id'})
  @ApiResponse({status: 200, description: 'Return homeworks by teacher id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  @ApiBearerAuth()
  @Roles(Role.Teacher, Role.Admin)

  async getHomeworksByTeacherId(@Param('teacherId') teacherId: string): Promise<Homeworks[]> {
    return this.homeworkService.findHomeworksByTeacherId(teacherId);
  }

  @Get('group/:groupId')
  @ApiOperation({summary: 'Get homeworks by group id'})
  @ApiResponse({status: 200, description: 'Return homeworks by group id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  @ApiBearerAuth()
  @Roles(Role.User, Role.Admin)

  async getHomeworksByGroupId(@Param('groupId') groupId: string): Promise<Homeworks[]> {
    return this.homeworkService.findHomeworksByGroupId(groupId);
  }

  @Post()
  @ApiOperation({summary: 'Create homework'})
  @ApiResponse({status: 200, description: 'Create homework.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})  
  @ApiResponse({status: 404, description: 'Not found.'})

  @ApiBearerAuth()
  @Roles(Role.Teacher, Role.Admin)

  async createHomework(@Body() createHomeworkDto: CreateHomeworkDto): Promise<Homeworks> {
    return this.homeworkService.create(createHomeworkDto);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update homework by id'})
  @ApiResponse({status: 200, description: 'Update homework by id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  @ApiBearerAuth()
  @Roles(Role.Teacher, Role.Admin)

  async updateHomework(@Param('id') id: string, @Body() updateHomeworkDto: UpdateHomeworkDto): Promise<Homeworks> {
    return this.homeworkService.update(id, updateHomeworkDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete homework by id'})
  @ApiResponse({status: 200, description: 'Delete homework by id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  @ApiBearerAuth()
  @Roles(Role.Teacher, Role.Admin)

  async removeHomework(@Param('id') id: string): Promise<Homeworks> {
    return this.homeworkService.remove(id);
  }
}