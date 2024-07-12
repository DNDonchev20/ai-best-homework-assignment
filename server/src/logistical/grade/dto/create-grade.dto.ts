import { ApiProperty } from "@nestjs/swagger";

export class CreateGradeDto {
    @ApiProperty({example: 'MATH', description: 'Subject ID'})
    studentId: string;

    @ApiProperty({example: 'GRP1', description: 'Group ID'})
    homeworkSubmissionId: string;

    @ApiProperty({example: 100, description: 'Grade of the student'})
    grade: number

    @ApiProperty({example: 100, description: 'Percentage of the grade'})
    percentage: number;

    @ApiProperty({example: 'Good Job', description: 'Feedback of the grade'})
    feedback: string;

    students?: any;
    homeworkSubmissions?: any;
}
