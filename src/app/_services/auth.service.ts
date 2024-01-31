import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environment/environment';

const AUTH_API = environment.apiUrl;
const USER_KEY = environment.userKey;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', username)
      .set('password', password);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa('app2:ghost'), // Reemplaza con tus credenciales de cliente
    });
    const response = this.http.post(AUTH_API + 'oauth/token', body.toString(), { headers });
    return response;
  }

  register(username: string, password: string, role: string): Observable<any> {
    const body = {
      username: username,
      password: password,
      role: role,
      permissions: ['read:mprofile', 'write:mprofile'],
    };
    const requestOptions = {
      withCredentials: true,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(AUTH_API + 'user/register', body, { headers, ...requestOptions});
  }

  saveUser(key: any, value: any): void {
    window.sessionStorage.removeItem(key);
    window.sessionStorage.setItem(key, value);
  }

  getUserEmail(token: string, email: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
    return this.http.get(`${AUTH_API}worker/search?email=${email}`, { headers });

  }

  logout(): Observable<any> {
    // return this.http.post(AUTH_API + 'signout', { }, httpOptions);
    return of({
      error: 'Salio del sistema'
    });
  }
}
