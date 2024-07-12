import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HomeworkService } from './homework.service';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Homeworks } from '@prisma/client';

@ApiTags('homework')
@Controller('homework')
export class HomeworkController {
  constructor(private readonly homeworkService: HomeworkService) {}

  @Get()
  @ApiOperation({summary: 'Get all homeworks'})
  @ApiResponse({status: 200, description: 'Return all homeworks.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  async findAllHomeworks(): Promise<Homeworks[]> {
    return this.homeworkService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get homework by id'})
  @ApiResponse({status: 200, description: 'Return homework by id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  async findOneHomework(@Param('id') id: string): Promise<Homeworks> {
    return this.homeworkService.findOne(id);
  }

  @Post()
  @ApiOperation({summary: 'Create homework'})
  @ApiResponse({status: 200, description: 'Create homework.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})  
  @ApiResponse({status: 404, description: 'Not found.'})

  async createHomework(@Body() createHomeworkDto: CreateHomeworkDto): Promise<Homeworks> {
    return this.homeworkService.create(createHomeworkDto);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update homework by id'})
  @ApiResponse({status: 200, description: 'Update homework by id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  async updateHomework(@Param('id') id: string, @Body() updateHomeworkDto: UpdateHomeworkDto): Promise<Homeworks> {
    return this.homeworkService.update(id, updateHomeworkDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete homework by id'})
  @ApiResponse({status: 200, description: 'Delete homework by id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  async removeHomework(@Param('id') id: string): Promise<Homeworks> {
    return this.homeworkService.remove(id);
  }
}
