import { TestBed } from '@angular/core/testing';

import { ProdcutService } from './prodcut.service';

describe('ProdcutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProdcutService = TestBed.get(ProdcutService);
    expect(service).toBeTruthy();
  });
});
