import { PartialType } from '@nestjs/mapped-types';
import { CreateHomeworkDto } from './create-homework.dto';

export class UpdateHomeworkDto extends PartialType(CreateHomeworkDto) {
    teacherId?: string;
    groupId?: string;
    title?: string;
    description?: string;
    dueDate?: string;
    maxPoints?: number;
}