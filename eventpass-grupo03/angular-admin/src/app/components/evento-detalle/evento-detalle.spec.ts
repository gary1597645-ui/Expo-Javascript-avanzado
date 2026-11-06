import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { EventoDetalle } from './evento-detalle';

describe('EventoDetalle', () => {
  let component: EventoDetalle;
  let fixture: ComponentFixture<EventoDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventoDetalle],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(EventoDetalle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
