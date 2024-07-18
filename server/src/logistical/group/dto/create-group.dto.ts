import { ApiProperty } from "@nestjs/swagger";

export class CreateGroupDto {
    @ApiProperty({example: 'Group 1', description: 'Name of the Group'})
    name: string;

    @ApiProperty({example: 'GRP1', description: 'Code of the Group'})
    code?: string;

    @ApiProperty({example: 2021, description: 'Year of the Group'})
    year: number;
}