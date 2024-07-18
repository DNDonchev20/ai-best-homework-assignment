import { Module } from '@nestjs/common';
import { UserModule } from './logistical/user/user.module';
import { TeacherModule } from './logistical/teacher/teacher.module';
import { SubjectsModule } from './logistical/subject/subject.module';
import { HomeworkSubmissionModule } from './logistical/homework-submission/homework-submission.module';
import { HomeworkModule } from './logistical/homework/homework.module';
import { GroupModule } from './logistical/group/group.module';
import { GradeModule } from './logistical/grade/grade.module';
import { StudentDetailsModule } from './logistical/student-details/student-details.module';


@Module({
  providers: [],
  imports: [UserModule, TeacherModule, SubjectsModule, HomeworkSubmissionModule, HomeworkModule, GroupModule, GradeModule, StudentDetailsModule],
})
export class LogisticalModule {}