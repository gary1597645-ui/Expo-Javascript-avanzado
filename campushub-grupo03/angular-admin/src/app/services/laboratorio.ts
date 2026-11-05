import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Laboratorio } from '../models/laboratorio.interface';

@Injectable({
    providedIn: 'root'
})
export class LaboratorioService {
    private apiUrl = 'http://localhost:3000/laboratorios';

    constructor(private http: HttpClient) { }

    getLaboratorios(): Observable<Laboratorio[]> {
        return this.http.get<Laboratorio[]>(this.apiUrl);
    }

    getLaboratorio(id: number): Observable<Laboratorio> {
        return this.http.get<Laboratorio>(`${this.apiUrl}/${id}`);
    }

    crearLaboratorio(laboratorio: Laboratorio): Observable<Laboratorio> {
        return this.http.post<Laboratorio>(this.apiUrl, laboratorio);
    }

    actualizarLaboratorio(id: number, laboratorio: Laboratorio): Observable<Laboratorio> {
        return this.http.put<Laboratorio>(`${this.apiUrl}/${id}`, laboratorio);
    }

    eliminarLaboratorio(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}