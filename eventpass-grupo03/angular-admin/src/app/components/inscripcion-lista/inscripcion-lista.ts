import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionService } from '../../services/inscripcion';
import { Inscripcion } from '../../models/inscripcion.interface';
// 1. Importamos apuntando directamente al archivo en la carpeta pipes
import { EstadoInscripcionPipe } from '../../pipes/estado-inscripcion-pipe';

@Component({
  selector: 'app-inscripcion-lista',
  standalone: true,
  // 2. Colocamos el nombre exacto de la clase en los imports
  imports: [CommonModule, EstadoInscripcionPipe],
  templateUrl: './inscripcion-lista.html'
})
export class InscripcionLista implements OnInit {
  inscripciones: Inscripcion[] = [];

  constructor(private inscripcionService: InscripcionService) { }

  ngOnInit(): void {
    this.inscripcionService.getInscripciones().subscribe({
      next: (datos) => this.inscripciones = datos,
      error: (err) => console.error(err)
    });
  }
}