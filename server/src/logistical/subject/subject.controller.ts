import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('subject')
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectsService: SubjectService) {}

  @Get()
  @ApiOperation({summary: 'Get all subjects'})
  @ApiResponse({status: 200, description: 'Return all subjects.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  async findAllSubjects() {
    return this.subjectsService.findAllSubjects();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get subject by id'})
  @ApiResponse({status: 200, description: 'Return subject by id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  async findOneSubjectById(@Param('id') id: string) {
    return this.subjectsService.findOneSubjectById(id);
  }

  @Post()
  @ApiOperation({summary: 'Create subject'})
  @ApiResponse({status: 200, description: 'Create subject.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  async createSubject(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectsService.createSubject(createSubjectDto);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update subject by id'})
  @ApiResponse({status: 200, description: 'Update subject by id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})

  async updateSubject(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectsService.updateSubject(id, updateSubjectDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete subject by id'})
  @ApiResponse({status: 200, description: 'Delete subject by id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  async deleteSubject(@Param('id') id: string) {
    return this.subjectsService.removeSubject(id);
  }
}