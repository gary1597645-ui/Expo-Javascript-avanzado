import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservaLista } from './reserva-lista';

describe('ReservaLista', () => {
  let component: ReservaLista;
  let fixture: ComponentFixture<ReservaLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaLista],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservaLista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
