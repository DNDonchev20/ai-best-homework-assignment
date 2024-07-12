import {ApiProperty} from '@nestjs/swagger';
import { Role } from 'src/enums/role.enum';

export class CreateUserDto {
    @ApiProperty({example: 'johndoe@gmail.com', description: 'Email of the User'})
    readonly email: string;

    @ApiProperty({example: 'John', description: 'First name of the User'})
    readonly firstName: string;

    @ApiProperty({example: 'Doe', description: 'Last name of the User'})
    readonly lastName: string;

    @ApiProperty({example: 'password', description: 'Password of the User'})
    readonly password: string

    readonly role?: Role;
}