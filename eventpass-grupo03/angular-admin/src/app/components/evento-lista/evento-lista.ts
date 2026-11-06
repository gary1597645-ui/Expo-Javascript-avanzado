import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { EventoService } from '../../services/evento';
import { Evento } from '../../models/evento.interface';
import { InscripcionService } from '../../services/inscripcion';
import { Inscripcion } from '../../models/inscripcion.interface';
import { ResaltarAforoDirective } from '../../directives/resaltar-aforo';

@Component({
  selector: 'app-evento-lista',
  standalone: true,
  imports: [CommonModule, RouterLink, ResaltarAforoDirective],
  templateUrl: './evento-lista.html'
})
export class EventoLista implements OnInit {
  eventos: Evento[] = [];
  inscripciones: Inscripcion[] = [];

  constructor(
    private eventoService: EventoService,
    private inscripcionService: InscripcionService
  ) { }

  ngOnInit(): void {
    this.cargarEventos();
  }

  cargarEventos(): void {
    forkJoin({
      eventos: this.eventoService.getEventos(),
      inscripciones: this.inscripcionService.getInscripciones()
    }).subscribe({
      next: (datos) => {
        this.eventos = datos.eventos;
        this.inscripciones = datos.inscripciones;
      },
      error: (err) => console.error("Error al obtener eventos:", err)
    });
  }

  inscritosConfirmados(eventoId: number | undefined): number {
    return this.inscripciones.filter(inscripcion =>
      inscripcion.eventoId === eventoId && inscripcion.estado === 'confirmada'
    ).length;
  }

  estadoAforo(evento: Evento): 'disponible' | 'ultimos-cupos' | 'agotado' {
    const disponibles = evento.capacidadMax - this.inscritosConfirmados(evento.id);
    if (disponibles <= 0) return 'agotado';
    if (disponibles <= Math.max(1, Math.ceil(evento.capacidadMax * 0.1))) return 'ultimos-cupos';
    return 'disponible';
  }

  eliminar(id: number | undefined): void {
    if (id && confirm('¿Estás seguro de eliminar este evento?')) {
      this.eventoService.eliminarEvento(id).subscribe({
        next: () => {
          this.cargarEventos();
        },
        error: (err) => console.error("Error al eliminar:", err)
      });
    }
  }
}