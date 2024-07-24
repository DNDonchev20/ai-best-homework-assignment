import { ApiProperty } from "@nestjs/swagger";

export class CreateGradeDto {
    @ApiProperty({example: 'clytw4z7f0007kdvm44rnk2ic', description: 'Subject ID'})
    teacherId: string;

    @ApiProperty({example: 'clytw4z7f0007kdvm44rnk2ic', description: 'Student ID'})
    studentId: string;

    @ApiProperty({example: 'GRP1', description: 'Group ID'})
    homeworkSubmissionId: string;

    @ApiProperty({example: 100, description: 'Grade of the student'})
    grade: number

    @ApiProperty({example: 100, description: 'Percentage of the grade'})
    percentage: number;

    @ApiProperty({example: 'Good Job', description: 'Feedback of the grade'})
    feedback: string;

    teachers?: any;
    homeworkSubmissions?: any;
}