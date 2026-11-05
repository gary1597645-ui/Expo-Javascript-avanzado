import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // <-- Importamos ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LaboratorioService } from '../../services/laboratorio';
import { Laboratorio } from '../../models/laboratorio.interface';
import { ResaltarEstadoDirective } from '../../directives/resaltar-estado'; // Verifica el nombre exacto de tu archivo y clase

@Component({
  selector: 'app-laboratorio-lista',
  standalone: true,
  imports: [CommonModule, RouterLink, ResaltarEstadoDirective],
  templateUrl: './laboratorio-lista.html'
})
export class LaboratorioLista implements OnInit {
  laboratorios: Laboratorio[] = [];

  constructor(
    private laboratorioService: LaboratorioService,
    private cd: ChangeDetectorRef // <-- Lo inyectamos en el constructor
  ) { }

  ngOnInit(): void {
    this.cargarLaboratorios();
  }

  cargarLaboratorios(): void {
    this.laboratorioService.getLaboratorios().subscribe({
      next: (datos) => {
        // Clonamos el arreglo para que Angular note la diferencia de inmediato
        this.laboratorios = [...datos];

        // ¡Forzamos a Angular a actualizar la pantalla en este milisegundo exacto!
        this.cd.detectChanges();
      },
      error: (err) => console.error("Error al obtener laboratorios:", err)
    });
  }

  eliminar(id: number | undefined): void {
    if (id && confirm('¿Estás seguro de eliminar este laboratorio?')) {
      this.laboratorioService.eliminarLaboratorio(id).subscribe({
        next: () => {
          this.cargarLaboratorios(); // Se vuelve a llamar y ahora el detectChanges repintará la tabla
        },
        error: (err) => console.error("Error al eliminar:", err)
      });
    }
  }
}