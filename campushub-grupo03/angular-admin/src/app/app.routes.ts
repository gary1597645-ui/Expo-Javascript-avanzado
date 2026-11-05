import { Routes } from '@angular/router';
// Importamos respetando que tus archivos y clases NO llevan ".component"
import { LaboratorioLista } from './components/laboratorio-lista/laboratorio-lista';
import { LaboratorioFormulario } from './components/laboratorio-formulario/laboratorio-formulario';
import { LaboratorioDetalle } from './components/laboratorio-detalle/laboratorio-detalle';
import { ReservaLista } from './components/reserva-lista/reserva-lista';

export const routes: Routes = [
    { path: 'laboratorios', component: LaboratorioLista },
    { path: 'laboratorios/nuevo', component: LaboratorioFormulario },
    { path: 'laboratorios/:id/editar', component: LaboratorioFormulario },
    { path: 'laboratorios/:id', component: LaboratorioDetalle },
    { path: 'reservas', component: ReservaLista },
    { path: '', redirectTo: '/laboratorios', pathMatch: 'full' }
];