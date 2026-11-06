import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoInscripcion',
  standalone: true
})
// Agregamos la palabra Pipe al nombre de la clase
export class EstadoInscripcionPipe implements PipeTransform {
  transform(value: string): string {
    switch (value.toLowerCase()) {
      case 'confirmada': return '✅ Confirmada';
      case 'en_espera': return '⏳ En espera';
      case 'cancelada': return '❌ Cancelada';
      default: return value;
    }
  }
}