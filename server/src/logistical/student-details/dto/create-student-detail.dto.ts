import { ApiProperty } from "@nestjs/swagger";

export class CreateStudentDetailDto {
    @ApiProperty({example: 'John Doe', description: 'Name of the Student'})
    userId: string;

    @ApiProperty({example: 'GRP1', description: 'Group ID'})
    groupIds: string[];

    @ApiProperty({example: 'MATH', description: 'Subject ID'})
    classNumber: number;

    users?: any;
}