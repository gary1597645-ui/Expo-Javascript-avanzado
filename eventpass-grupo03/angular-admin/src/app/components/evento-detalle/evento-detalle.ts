import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Importamos ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventoService } from '../../services/evento';
import { Evento } from '../../models/evento.interface';

@Component({
  selector: 'app-evento-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './evento-detalle.html'
})
export class EventoDetalle implements OnInit {
  evento?: Evento;

  constructor(
    private route: ActivatedRoute,
    private eventoService: EventoService,
    private cd: ChangeDetectorRef // 2. Lo inyectamos en el constructor
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.eventoService.getEvento(id).subscribe({
        next: (data) => {
          this.evento = data;

          // 3. ¡Obligamos a Angular a repintar el HTML de inmediato!
          this.cd.detectChanges();
        },
        error: (err) => console.error("Error al cargar el evento:", err)
      });
    }
  }
}