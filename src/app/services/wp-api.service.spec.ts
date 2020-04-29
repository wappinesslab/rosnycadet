import { TestBed } from '@angular/core/testing';

import { WpApiService } from './wp-api.service';

describe('WpApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WpApiService = TestBed.get(WpApiService);
    expect(service).toBeTruthy();
  });
});
