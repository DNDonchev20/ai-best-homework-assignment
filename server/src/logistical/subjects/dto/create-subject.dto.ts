import { ApiProperty } from "@nestjs/swagger";

export class CreateSubjectDto {
    @ApiProperty({example: 'Mathematics', description: 'Name of the Subject'})
    readonly name: string;
    
    @ApiProperty({example: 'MATH', description: 'Code of the Subject'})
    code?: string;
}
