import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Responsable} from '../models/responsable.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ResponsableService {
  private apiUrl = `http://localhost:8080/api/admin/responsables`;

  constructor(private http: HttpClient) { }

  getAllResponsables(): Observable<Responsable[]> {
    return this.http.get<Responsable[]>(this.apiUrl);
  }

  getResponsableById(id: number): Observable<Responsable> {
    return this.http.get<Responsable>(`${this.apiUrl}/${id}`);
  }

  createResponsable(responsable: any): Observable<any> {
    return this.http.post(this.apiUrl, responsable, httpOptions);
  }

  updateResponsable(id: number, responsable: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, responsable, httpOptions);
  }

  deleteResponsable(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, httpOptions);
  }
}
