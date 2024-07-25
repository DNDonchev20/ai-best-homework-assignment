import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Users } from '@prisma/client';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { Public } from 'src/decorators/is_public.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Get()
  @ApiOperation({summary: 'Get all users'})
  @ApiResponse({status: 200, description: 'Return all users.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  @ApiBearerAuth()
  @Roles(Role.Admin)

  async findAllUsers(): Promise<Users[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get user by id'})
  @ApiResponse({status: 200, description: 'Return user by id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  @ApiBearerAuth()
  @Roles(Role.User, Role.Teacher, Role.Admin)

  async findUserById(@Param('id') id: string): Promise<Users> {
    return this.userService.findUserById(id);
  }

  @Public()
  @Get('id/email/:email')
  @ApiOperation({summary: 'Get user id by email'})
  @ApiResponse({status: 200, description: 'Return user id by email.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  @ApiBearerAuth()
  @Roles(Role.User, Role.Teacher, Role.Admin)

  async findIdByEmail(@Param('email') email: string): Promise<string> {
    return this.userService.findIdByEmail(email);
  }

  @Public()
  @Post()
  @ApiOperation({summary: 'Create user'})
  @ApiResponse({status: 200, description: 'Create user.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  async createUser(@Body() createUserDto: CreateUserDto): Promise<Users> {
    console.log(createUserDto);
    return this.userService.createUser(createUserDto);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update user by id'})
  @ApiResponse({status: 200, description: 'Update user by id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  @ApiBearerAuth()
  @Roles(Role.Admin)

  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<Users> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete user by id'})
  @ApiResponse({status: 200, description: 'Delete user by id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  @ApiBearerAuth()
  @Roles(Role.Admin)

  async deleteUser(@Param('id') id: string): Promise<Users> {
    return this.userService.removeUser(id);
  }

  @Public()
  @Patch('refresh/id/:id')
  @ApiOperation({summary: 'Update refresh token by id'})
  @ApiResponse({status: 200, description: 'Update refresh token by id.'})
  @ApiResponse({status: 403, description: 'Forbidden.'})
  @ApiResponse({status: 404, description: 'Not found.'})

  async updateRefreshToken(@Param('id') id: string, @Body('refreshToken') refreshToken: string): Promise<void> {
    return this.userService.updateRefreshToken(id, refreshToken);
  }
}