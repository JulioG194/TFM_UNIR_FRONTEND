import { TestBed } from '@angular/core/testing';

import { EncryptedService } from './encrypted.service';

describe('EncryptedService', () => {
  let service: EncryptedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncryptedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
