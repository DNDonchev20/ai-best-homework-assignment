import { PartialType } from '@nestjs/mapped-types';
import { CreateGradeDto } from './create-grade.dto';

export class UpdateGradeDto extends PartialType(CreateGradeDto) {
    studentId?: string;
    homeworkSubmissionId?: string;
    grade?: number;
    percentage?: number;
    feedback?: string;
}