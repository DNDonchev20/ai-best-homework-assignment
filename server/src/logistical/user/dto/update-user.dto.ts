import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Role } from 'src/enums/role.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    email?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    role?: Role;
}