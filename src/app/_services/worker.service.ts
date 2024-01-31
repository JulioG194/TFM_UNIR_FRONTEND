import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

const AUTH_API = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  constructor(private http: HttpClient) { }

  createWorker(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'Bearer ' + token,
    });
    return this.http.put(AUTH_API + 'worker/update-info', data, { headers });
  }

}
