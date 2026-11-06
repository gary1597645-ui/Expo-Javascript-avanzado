import { Routes } from '@angular/router';
// Importamos respetando que tus archivos y clases NO llevan ".component"
import { EventoLista } from './components/evento-lista/evento-lista';
import { EventoFormulario } from './components/evento-formulario/evento-formulario';
import { EventoDetalle } from './components/evento-detalle/evento-detalle';
import { InscripcionLista } from './components/inscripcion-lista/inscripcion-lista';

export const routes: Routes = [
    { path: 'eventos', component: EventoLista },
    { path: 'eventos/nuevo', component: EventoFormulario },
    { path: 'eventos/:id/editar', component: EventoFormulario },
    { path: 'eventos/:id', component: EventoDetalle },
    { path: 'inscripciones', component: InscripcionLista },
    { path: '', redirectTo: '/eventos', pathMatch: 'full' }
];