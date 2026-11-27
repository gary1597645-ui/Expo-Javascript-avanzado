import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoInscripcion',
  standalone: true
})
export class EstadoInscripcionPipe implements PipeTransform {
  transform(value: string): string {
    switch (value.toLowerCase()) {
      case 'pendiente': return '🕒 Pendiente';
      case 'aprobada': return '✅ Aprobada';
      case 'rechazada': return '🚫 Rechazada';
      case 'confirmada': return '✅ Confirmada';
      case 'en_espera': return '⏳ En espera';
      case 'cancelada': return '❌ Cancelada';
      default: return value;
    }
  }
}