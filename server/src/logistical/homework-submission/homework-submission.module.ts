import { Module } from '@nestjs/common';
import { HomeworkSubmissionService } from './homework-submission.service';
import { HomeworkSubmissionController } from './homework-submission.controller';

import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  controllers: [HomeworkSubmissionController],
  providers: [HomeworkSubmissionService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
  exports: [HomeworkSubmissionService],
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 10000,
      limit: 5,
    }]),
  ]
})
export class HomeworkSubmissionModule {}