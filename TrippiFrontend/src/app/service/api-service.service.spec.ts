import { TestBed } from '@angular/core/testing';
import { ApiServiceService } from './api-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
describe('ApiServiceService', () => {
  let service: ApiServiceService;
  let httpMock: HttpTestingController
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
