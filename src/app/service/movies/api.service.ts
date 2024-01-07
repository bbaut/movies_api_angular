import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const headers = new HttpHeaders()
  .set('Authorization', environment.apiAuth)
  .set('accept', 'application/json');

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private urlApi = environment.urlAPI;
  private page!: number;

  constructor(private http: HttpClient) {}
  
  public getData(): Observable<any> {
    return this.http.get<any>(this.urlApi + `&page=${this.page}`, {'headers': headers});
  }

  public setTest(value: number) {
    this.page = value;
  }
}
