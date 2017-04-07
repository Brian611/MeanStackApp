import { TestBed, inject } from '@angular/core/testing';

import { AuthenticeService } from './authentice.service';

describe('AuthenticeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticeService]
    });
  });

  it('should ...', inject([AuthenticeService], (service: AuthenticeService) => {
    expect(service).toBeTruthy();
  }));
});
