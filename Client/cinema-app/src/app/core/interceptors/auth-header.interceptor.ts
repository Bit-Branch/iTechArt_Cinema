import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AuthService } from '@core/services/auth.service'
import { Observable } from 'rxjs'

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (this.authService.isLoggedIn()) {
            request = request.clone({
                headers: request.headers.set('Authorization', 'Bearer ' + this.authService.getToken()),
            });
        }
        return next.handle(request);
    }
}