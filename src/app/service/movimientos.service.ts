import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../model/Transaction';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {

  private apiUrl = 'http://localhost:8080/transactions';

  constructor(private http: HttpClient) { }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.data.map((transactionData : any) => new Transaction(transactionData)))
    );
  }

  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getTransaction(id: number): Observable<Transaction> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => new Transaction(response.data))
    );
  }

  createTransaction(transaction: Transaction): Observable<Transaction> {
    transaction.transactionType = transaction.transactionType == 'Retiro' ? 'WITHDRAWAL' : 'DEPOSIT';
    return this.http.post<any>(this.apiUrl, transaction).pipe(
      map(response => new Transaction(response.data))
    );
  }

  updateTransaction(transaction: Transaction): Observable<Transaction> {
    transaction.transactionType = transaction.transactionType == 'Retiro' ? 'WITHDRAWAL' : 'DEPOSIT';
    return this.http.patch<any>(`${this.apiUrl}/${transaction.id}`, transaction).pipe(
      map(response => new Transaction(response.data))
    );
  }
}
