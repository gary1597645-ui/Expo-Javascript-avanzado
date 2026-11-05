import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoReserva',
  standalone: true
})
// Agregamos la palabra Pipe al nombre de la clase
export class EstadoReservaPipe implements PipeTransform {
  transform(value: string): string {
    switch (value.toLowerCase()) {
      case 'aprobada': return '✅ Aprobada';
      case 'pendiente': return '⏳ Pendiente';
      case 'rechazada': return '❌ Rechazada';
      default: return value;
    }
  }
}