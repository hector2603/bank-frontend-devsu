import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private apiUrl = 'http://localhost:8080/reports';

  constructor(private http: HttpClient) { }

  getReportJson(params: any): Observable<any> {
    return this.http.get<any>(this.apiUrl, { params });
  }

  getReportPdf(params: any): void {
    const queryParams = new HttpParams({ fromObject: params }).toString();
    window.open(`${this.apiUrl}?${queryParams}`);
  }
}
