import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservaService } from '../../services/reserva';
import { Reserva } from '../../models/reserva.interface';
// 1. Importamos apuntando directamente al archivo en la carpeta pipes
import { EstadoReservaPipe } from '../../pipes/estado-reserva-pipe';

@Component({
  selector: 'app-reserva-lista',
  standalone: true,
  // 2. Colocamos el nombre exacto de la clase en los imports
  imports: [CommonModule, EstadoReservaPipe],
  templateUrl: './reserva-lista.html'
})
export class ReservaLista implements OnInit {
  reservas: Reserva[] = [];

  constructor(private reservaService: ReservaService) { }

  ngOnInit(): void {
    this.reservaService.getReservas().subscribe({
      next: (datos) => this.reservas = datos,
      error: (err) => console.error(err)
    });
  }
}