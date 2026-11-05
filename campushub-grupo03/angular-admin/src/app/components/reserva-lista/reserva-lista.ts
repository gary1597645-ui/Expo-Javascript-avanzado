// 1. Importamos ChangeDetectorRef desde @angular/core
import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { ReservaService } from '../../services/reserva';
import { Reserva } from '../../models/reserva.interface';
import { EstadoReservaPipe } from '../../pipes/estado-reserva-pipe';

@Component({
  selector: 'app-reserva-lista',
  standalone: true,
  imports: [CommonModule, EstadoReservaPipe],
  templateUrl: './reserva-lista.html'
})
export class ReservaLista implements OnInit {
  reservas: Reserva[] = [];

  // 2. Inyectamos "private cd: ChangeDetectorRef" dentro del constructor
  constructor(
    private reservaService: ReservaService,
    private cd: ChangeDetectorRef 
  ) { }

  ngOnInit(): void {
    this.reservaService.getReservas().subscribe({
      next: (datos) => {
        this.reservas = datos;
        this.cd.detectChanges(); // 3. Ahora sí funcionará sin error
      },
      error: (err) => console.error(err)
    });
  }
}