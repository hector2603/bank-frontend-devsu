import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../model/Account';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {

  private apiUrl = 'http://localhost:8080/accounts';

  constructor(private http: HttpClient) { }

  getAccounts(): Observable<Account[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.data.map((accountData : any) => new Account(accountData)))
    );
  }

  deleteAccount(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAccount(id: number): Observable<Account> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => new Account(response.data))
    );
  }

  createAccount(account: Account): Observable<Account> {
    account.accountType = account.accountType == 'Ahorros' ? 'SAVINGS' : 'CURRENT';
    return this.http.post<any>(this.apiUrl, account).pipe(
      map(response => new Account(response.data))
    );
  }

  updateAccount(account: Account): Observable<Account> {
    account.status = account.status == 'Activo' ? 'true' : 'false';
    return this.http.patch<any>(`${this.apiUrl}`, account).pipe(
      map(response => new Account(response.data))
    );
  }

}
