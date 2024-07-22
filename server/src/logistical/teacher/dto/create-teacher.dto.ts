
import { ApiProperty } from "@nestjs/swagger";

export class CreateTeacherDto {
    @ApiProperty({example: 'clytw4z7f0007kdvm44rnk2ic', description: 'Name of the Teacher'})
    userId: string;

    @ApiProperty({example: 'clytw3ym50005kdvmwv99vx9h', description: 'Subject ID'})
    subjectId: string;    

    @ApiProperty({example: ["clytw3ke30004kdvmlslni198", "clytw432q0006kdvm6rvhhs7k"], description: 'Group ID'})
    groupIds: string[];

    users?: any;
    subjects?: any;
}