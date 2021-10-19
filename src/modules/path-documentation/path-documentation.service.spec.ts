import { Test, TestingModule } from '@nestjs/testing';
import { PathDocumentationService } from './path-documentation.service';

describe('PathDocumentationService', () => {
  let service: PathDocumentationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PathDocumentationService],
    }).compile();

    service = module.get<PathDocumentationService>(PathDocumentationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
