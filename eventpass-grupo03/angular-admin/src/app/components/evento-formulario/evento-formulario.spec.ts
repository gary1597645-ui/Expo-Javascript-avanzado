import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { EventoFormulario } from './evento-formulario';

describe('EventoFormulario', () => {
  let component: EventoFormulario;
  let fixture: ComponentFixture<EventoFormulario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventoFormulario],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(EventoFormulario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
