import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthService } from '@core/services/auth.service';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
  constructor(private readonly authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authService.isLoggedIn()) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${this.authService.getToken()}`)
      });
    }
    return next.handle(request);
  }
}
