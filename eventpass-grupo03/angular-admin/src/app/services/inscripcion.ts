import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inscripcion } from '../models/inscripcion.interface';

@Injectable({ providedIn: 'root' })
export class InscripcionService {
    private apiUrl = 'http://localhost:3000/inscripciones';

    constructor(private http: HttpClient) { }

    getInscripciones(): Observable<Inscripcion[]> {
        return this.http.get<Inscripcion[]>(this.apiUrl);
    }

    // Actualiza el estado de una inscripción con PATCH.
    actualizarEstado(id: number | string, estado: 'aprobada' | 'rechazada'): Observable<Inscripcion> {
        return this.http.patch<Inscripcion>(`${this.apiUrl}/${id}`, { estado });
    }
}