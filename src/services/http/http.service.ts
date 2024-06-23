import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiUrl = 'https://localhost:7062/api'; 

  constructor(private http:HttpClient ) { }

    // Generic GET method
    get<T>(endpoint: string): Observable<T> {
      const url = `${this.apiUrl}/${endpoint}`;
      return this.http.get<T>(url);
    }
  
    // Generic POST method
    post<T>(endpoint: string, data: any): Observable<T> {
      const url = `${this.apiUrl}/${endpoint}`;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return this.http.post<T>(url, data, httpOptions);
    }
}
