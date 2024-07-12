import { Test, TestingModule } from '@nestjs/testing';
import { HomeworkSubmissionController } from './homework-submission.controller';
import { HomeworkSubmissionService } from './homework-submission.service';

describe('HomeworkSubmissionController', () => {
  let controller: HomeworkSubmissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeworkSubmissionController],
      providers: [HomeworkSubmissionService],
    }).compile();

    controller = module.get<HomeworkSubmissionController>(HomeworkSubmissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
