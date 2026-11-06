import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { EventoService } from '../../services/evento';
import { Evento } from '../../models/evento.interface';

export function formatoNombreValidador(control: AbstractControl): ValidationErrors | null {
  const valido = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9][A-Za-zÁÉÍÓÚáéíóúÑñ0-9 .,'-]{2,59}$/.test(control.value);
  return valido ? null : { formatoInvalido: true };
}

@Component({
  selector: 'app-evento-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './evento-formulario.html'
})
export class EventoFormulario implements OnInit {
  form: FormGroup;
  esEdicion = false;
  idEdicion?: number;

  constructor(
    private fb: FormBuilder,
    private eventoService: EventoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, formatoNombreValidador]],
      lugar: ['', Validators.required],
      fecha: ['', Validators.required],
      capacidadMax: [100, [Validators.required, Validators.min(1), Validators.max(10000)]],
      descripcion: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.idEdicion = Number(id);
      this.eventoService.getEvento(this.idEdicion).subscribe({
        next: evento => this.form.patchValue(evento),
        error: err => console.error('Error al cargar el evento:', err)
      });
    }
  }

  guardar(): void {
    if (this.form.invalid) return;

    const evento: Evento = this.form.getRawValue();
    const operacion = this.esEdicion && this.idEdicion
      ? this.eventoService.actualizarEvento(this.idEdicion, evento)
      : this.eventoService.crearEvento(evento);

    operacion.subscribe({
      next: () => this.router.navigate(['/eventos']),
      error: err => console.error('Error al guardar el evento:', err)
    });
  }
}
