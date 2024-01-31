import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { AuthResponse } from '../interfaces/response.model';
import { EncryptedService } from '../_services/encrypted.service';
import { AuthService } from '../_services/auth.service';

const ACCESS_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';
const ACCESS_TIME = 'accessTokenExpiresAt';
const REFRESH_TIME = 'refreshTokenExpiresAt';
const AUTH_API = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(
    private http: HttpClient,
    private encryptedService: EncryptedService,
    private authService: AuthService, ) {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public getUser(key: any): any {
    return window.sessionStorage.getItem(key);
  }

  files(file: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'Bearer ' + token,
    });
    return this.http.post(AUTH_API + 'upload/files', formData, { headers });
  }

  getCsrfToken(): string | null {
    const csrfCookieName = 'XSRF-TOKEN'; 
    const csrfToken = this.getCookie(csrfCookieName);
    return csrfToken;
  }

  private getCookie(name: string): string | null {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split('=');
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }

  public async isLoggedIn(): Promise<boolean> {
    const accessToken = window.sessionStorage.getItem(ACCESS_KEY);
    const refreshToken = window.sessionStorage.getItem(REFRESH_KEY);

    if (accessToken && refreshToken) {
    //   return true
    // }
    // return false;
    if (accessToken) {
      const accessTokenTimeString = window.sessionStorage.getItem(ACCESS_TIME);
      const refreshTokenTimeString = window.sessionStorage.getItem(REFRESH_TIME);
      if (accessTokenTimeString && refreshTokenTimeString) {
        const accessTokenTime = Math.floor(new Date(accessTokenTimeString).getTime() / 1000);
        const refreshTokenTime = Math.floor(new Date(refreshTokenTimeString).getTime() / 1000);
        const currentTimeInSeconds = Math.floor(Date.now() / 1000);
        if ((accessTokenTime < currentTimeInSeconds) && (refreshTokenTime < currentTimeInSeconds))
        {
          const body = new HttpParams()
            .set('grant_type', 'refresh_token')
            .set('refresh_token', refreshToken);
          const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + btoa('app2:ghost'),
          });
          try {
            const response = await this.http.post<AuthResponse>(AUTH_API + 'oauth/token', body.toString(), { headers }).toPromise();
            if (response) {
              this.authService.saveUser(ACCESS_KEY, response.data.accessToken);
              this.authService.saveUser(REFRESH_KEY, response.data.refreshToken);
              const newAccessTokenExpiresAt = this.encryptedService.encryptData(response.data.accessTokenExpiresAt);
              const newrefreshTokenExpiresAt = this.encryptedService.encryptData(response.data.refreshTokenExpiresAt);
              this.authService.saveUser(ACCESS_TIME, newAccessTokenExpiresAt);
              this.authService.saveUser(REFRESH_TIME, newrefreshTokenExpiresAt);
                return true;
            } else {
              console.error('Respuesta indefinida al renovar el token de acceso');
              return false;
            }
          } catch (error) {
            console.error('Error al renovar el token de acceso', error);
            return false;
          }
        }
      }
    }
    }
    return false;
  }

}