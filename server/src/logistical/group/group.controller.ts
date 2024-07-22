import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';

@ApiTags('group')
@Controller('group')
export class GroupsController {
  constructor(private readonly groupsService: GroupService) {}

  @Get()
  @ApiOperation({summary: 'Get all groups'})
  @ApiResponse({status: 200, description: 'Return all groups.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  async findAllGroups() {
    return this.groupsService.findAllGroups();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get group by id'})
  @ApiResponse({status: 200, description: 'Return group by id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  async findOneGroupById(@Param('id') id: string) {
    return this.groupsService.findOneGroupById(id);
  }

  @Post()
  @ApiOperation({summary: 'Create group'})
  @ApiResponse({status: 200, description: 'Create group.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  async createGroup(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.createGroup(createGroupDto);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update group by id'})
  @ApiResponse({status: 200, description: 'Update group by id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})

  async updateGroup(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.updateGroup(id, updateGroupDto);  
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete group by id'})
  @ApiResponse({status: 200, description: 'Delete group by id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  async deleteGroup(@Param('id') id: string) {
    return this.groupsService.removeGroup(id);
  }
}