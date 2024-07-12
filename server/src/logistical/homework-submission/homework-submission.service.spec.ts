import { Test, TestingModule } from '@nestjs/testing';
import { HomeworkSubmissionService } from './homework-submission.service';

describe('HomeworkSubmissionService', () => {
  let service: HomeworkSubmissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomeworkSubmissionService],
    }).compile();

    service = module.get<HomeworkSubmissionService>(HomeworkSubmissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
