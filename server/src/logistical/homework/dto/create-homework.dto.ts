import { ApiProperty } from "@nestjs/swagger";

export class CreateHomeworkDto {
    @ApiProperty({example: '1', description: 'Group ID of the Homework'})
    teacherId: string;

    @ApiProperty({example: '1', description: 'Group ID of the Homework'})
    groupId: string;

    @ApiProperty({example: 'Homework 1', description: 'Title of the Homework'})
    title: string;

    @ApiProperty({example: 'This is the first homework', description: 'Description of the Homework'})
    description: string;

    @ApiProperty({example: '2021-12-31T23:59:59.999Z', description: 'Due date of the Homework'})
    dueDate: string;

    @ApiProperty({example: 100, description: 'Max points of the Homework'})
    maxPoints: number;

    group?: any;
    subject?: any;
    teacher?: any
}