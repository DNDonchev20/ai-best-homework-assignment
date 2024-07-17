import { ApiProperty } from "@nestjs/swagger";

export class CreateHomeworkSubmissionDto {
    @ApiProperty({example: '1', description: 'ID of the User'})
    homeworkId: string;

    @ApiProperty({example: '1', description: 'ID of the User'})
    studentId: string;

    @ApiProperty({example: '2021-12-31T23:59:59.999Z', description: 'Submission date of the Homework'})
    feedback?: string;

    homework?: any;
    student?: any;
}
