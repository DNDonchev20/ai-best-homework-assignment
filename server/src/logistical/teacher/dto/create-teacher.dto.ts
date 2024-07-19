
import { ApiProperty } from "@nestjs/swagger";

export class CreateTeacherDto {
    @ApiProperty({example: 'John Doe', description: 'Name of the Teacher'})
    userId: string;

    @ApiProperty({example: 'MATH', description: 'Subject ID'})
    subjectId: string;    

    @ApiProperty({example: 'GRP1', description: 'Group ID'})
    groupIds: string[];

    users?: any;
    subjects?: any;
}
