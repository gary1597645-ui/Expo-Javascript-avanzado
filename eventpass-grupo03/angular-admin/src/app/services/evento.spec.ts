import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { EventoService } from './evento';

describe('EventoService', () => {
  let service: EventoService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    service = TestBed.inject(EventoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});