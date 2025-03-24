import { TestBed } from '@angular/core/testing';

import { MyAIService } from './my-ai.service';

describe('AiService', () => {
  let service: MyAIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyAIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
