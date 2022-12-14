import { TestBed } from '@angular/core/testing';

import { FellowshipService } from './fellowship.service';

describe('FellowshipService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FellowshipService = TestBed.get(FellowshipService);
    expect(service).toBeTruthy();
  });
});
