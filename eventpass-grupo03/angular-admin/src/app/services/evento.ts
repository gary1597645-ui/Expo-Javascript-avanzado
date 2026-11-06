import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../models/evento.interface';

@Injectable({
    providedIn: 'root'
})
export class EventoService {
    private apiUrl = 'http://localhost:3000/eventos';

    constructor(private http: HttpClient) { }

    getEventos(): Observable<Evento[]> {
        return this.http.get<Evento[]>(this.apiUrl);
    }

    getEvento(id: number): Observable<Evento> {
        return this.http.get<Evento>(`${this.apiUrl}/${id}`);
    }

    crearEvento(evento: Evento): Observable<Evento> {
        return this.http.post<Evento>(this.apiUrl, evento);
    }

    actualizarEvento(id: number, evento: Evento): Observable<Evento> {
        return this.http.put<Evento>(`${this.apiUrl}/${id}`, evento);
    }

    eliminarEvento(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}