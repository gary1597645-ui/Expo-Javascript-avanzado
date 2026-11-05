import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Importamos ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LaboratorioService } from '../../services/laboratorio';
import { Laboratorio } from '../../models/laboratorio.interface';

@Component({
  selector: 'app-laboratorio-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './laboratorio-detalle.html'
})
export class LaboratorioDetalle implements OnInit {
  laboratorio?: Laboratorio;

  constructor(
    private route: ActivatedRoute,
    private laboratorioService: LaboratorioService,
    private cd: ChangeDetectorRef // 2. Lo inyectamos en el constructor
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.laboratorioService.getLaboratorio(id).subscribe({
        next: (data) => {
          this.laboratorio = data;

          // 3. ¡Obligamos a Angular a repintar el HTML de inmediato!
          this.cd.detectChanges();
        },
        error: (err) => console.error("Error al cargar el laboratorio:", err)
      });
    }
  }
}