import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionService } from '../../services/inscripcion';
import { Inscripcion } from '../../models/inscripcion.interface';
import { EstadoInscripcionPipe } from '../../pipes/estado-inscripcion-pipe';

@Component({
  selector: 'app-inscripcion-lista',
  standalone: true,
  imports: [CommonModule, EstadoInscripcionPipe],
  templateUrl: './inscripcion-lista.html'
})
export class InscripcionLista implements OnInit {
  inscripciones: Inscripcion[] = [];

  constructor(
    private inscripcionService: InscripcionService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarInscripciones();
  }

  cargarInscripciones(): void {
    this.inscripcionService.getInscripciones().subscribe({
      next: (datos) => {
        this.inscripciones = datos;
        this.changeDetector.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  cambiarEstado(id: number | string, estado: 'aprobada' | 'rechazada'): void {
    this.inscripcionService.actualizarEstado(id, estado).subscribe({
      next: () => this.cargarInscripciones(),
      error: (err) => console.error('Error al actualizar estado:', err)
    });
  }
}