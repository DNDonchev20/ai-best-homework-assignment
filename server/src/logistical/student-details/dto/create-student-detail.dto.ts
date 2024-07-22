import { ApiProperty } from "@nestjs/swagger";

export class CreateStudentDetailDto {
    @ApiProperty({example: 'clytw4z7f0007kdvm44rnk2ic', description: 'Name of the Student'})
    userId: string;

    @ApiProperty({example: ["clytw3ke30004kdvmlslni198", "clytw432q0006kdvm6rvhhs7k"], description: 'Group ID'})
    groupIds: string[];

    @ApiProperty({example: '1', description: 'Subject ID'})
    classNumber: number;

    users?: any;
}