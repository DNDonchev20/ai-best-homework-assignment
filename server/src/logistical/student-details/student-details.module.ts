import { Module } from '@nestjs/common';
import { StudentDetailsService } from './student-details.service';
import { StudentDetailsController } from './student-details.controller';

@Module({
  controllers: [StudentDetailsController],
  providers: [StudentDetailsService],
  exports: [StudentDetailsService],
})
export class StudentDetailsModule {}