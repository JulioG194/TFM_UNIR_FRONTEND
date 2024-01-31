import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../_services/storage.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  excludedRoutes: string[] = ['/login', '/register, /registerWorker', 'oauth/token', 'user/register'];
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.isExcludedRoute(req.url)) {
      return next.handle(req);
    }
    const token = window.sessionStorage.getItem('access_token');
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    req = req.clone({
      withCredentials: true,
    });
    return next.handle(req);
  }

  private isExcludedRoute(url: string): boolean {
    return this.excludedRoutes.some(excludedRoute => url.endsWith(excludedRoute));
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];