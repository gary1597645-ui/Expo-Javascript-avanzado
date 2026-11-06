import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { InscripcionService } from './inscripcion';

describe('InscripcionService', () => {
  let service: InscripcionService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    service = TestBed.inject(InscripcionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});