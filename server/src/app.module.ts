import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaModule } from './prisma.module';
import { UserModule } from './logistical/user/user.module';
import { HomeworkModule } from './logistical/homework/homework.module';
import { AuthModule } from './auth/auth.module';
import { HomeworkSubmissionModule } from './logistical/homework-submission/homework-submission.module';
import { SubjectsModule } from './logistical/subjects/subjects.module';
import { GroupsModule } from './logistical/groups/groups.module';
import { GradeModule } from './logistical/grade/grade.module';
import { TeacherModule } from './logistical/teacher/teacher.module';
import { StudentDetailsModule } from './logistical/student-details/student-details.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, UserModule, HomeworkModule, AuthModule, TeacherModule, HomeworkSubmissionModule, SubjectsModule, GroupsModule, GradeModule, HomeworkModule, StudentDetailsModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [AppService],
})
export class AppModule {}
