import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { EventoLista } from './evento-lista';

describe('EventoLista', () => {
  let component: EventoLista;
  let fixture: ComponentFixture<EventoLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventoLista],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(EventoLista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
