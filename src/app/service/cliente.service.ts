import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../model/Client';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn:  'root'
  })
export class ClienteService {

  private apiUrl = 'http://localhost:8080/clients';

  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.data.map((clientData : any) => new Client(clientData)))
    );
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getClient(id: number): Observable<Client> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => new Client(response.data))
    );
  }

  createClient(client: Client): Observable<Client> {
    return this.http.post<any>(this.apiUrl, client).pipe(
      map(response => new Client(response.data))
    );
  }

  updateClient(client: Client): Observable<Client> {
    return this.http.patch<any>(`${this.apiUrl}/${client.id}`, client).pipe(
      map(response => new Client(response.data))
    );
  }
  
}
