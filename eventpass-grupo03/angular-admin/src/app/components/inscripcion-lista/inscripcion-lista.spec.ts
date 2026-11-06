import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { InscripcionLista } from './inscripcion-lista';

describe('InscripcionLista', () => {
  let component: InscripcionLista;
  let fixture: ComponentFixture<InscripcionLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscripcionLista],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(InscripcionLista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
