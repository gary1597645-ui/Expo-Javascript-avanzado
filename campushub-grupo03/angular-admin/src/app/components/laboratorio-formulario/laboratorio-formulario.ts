import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { LaboratorioService } from '../../services/laboratorio'; // Verifica el nombre exacto de tu archivo
import { Laboratorio } from '../../models/laboratorio.interface';

// Validador propio basado en expresión regular exigido por la rúbrica
export function formatoNombreValidador(control: AbstractControl): ValidationErrors | null {
  const valido = /^Lab [A-Z]-\d{3}$/.test(control.value);
  return valido ? null : { formatoInvalido: true };
}

@Component({
  selector: 'app-laboratorio-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink], // ReactiveFormsModule es vital aquí
  templateUrl: './laboratorio-formulario.html'
})
export class LaboratorioFormulario implements OnInit {
  form: FormGroup;
  esEdicion = false;
  idEdicion?: number;

  constructor(
    private fb: FormBuilder,
    private laboratorioService: LaboratorioService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Configuración del formulario reactivo con validadores de rango y regex
    this.form = this.fb.group({
      nombre: ['', [Validators.required, formatoNombreValidador]],
      sede: ['', Validators.required],
      capacidad: [30, [Validators.required, Validators.min(1), Validators.max(60)]],
      estado: ['disponible', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.idEdicion = Number(id);
      this.laboratorioService.getLaboratorio(this.idEdicion).subscribe(lab => {
        this.form.patchValue(lab); // Llena los datos si estamos editando
      });
    }
  }

  guardar(): void {
    if (this.form.invalid) return;

    const labData: Laboratorio = {
      ...this.form.value,
      equipos: [] // Simplificado para este avance
    };

    if (this.esEdicion && this.idEdicion) {
      this.laboratorioService.actualizarLaboratorio(this.idEdicion, labData).subscribe({
        next: () => {
          // Navega de regreso solo cuando el servidor confirma la actualización
          this.router.navigate(['/laboratorios']);
        },
        error: (err) => console.error("Error al actualizar:", err)
      });
    } else {
      this.laboratorioService.crearLaboratorio(labData).subscribe({
        next: () => {
          // Navega de regreso solo cuando el servidor confirma la creación
          this.router.navigate(['/laboratorios']);
        },
        error: (err) => console.error("Error al crear:", err)
      });
    }
  }
}