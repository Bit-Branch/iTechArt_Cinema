import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '@core/models/auth-response';
import { shareReplay, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  register(email: string, password: string): Observable<Object> {
    return this.http.post(environment.hostUrl + '/api/users/register', {email, password});
  }

  login(email:string, password:string ): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.hostUrl + '/api/users/authenticate', {email, password})
            .pipe(tap(res => this.setSession(res)));
  }

  private setSession(authResponse : AuthResponse): void {
    localStorage.setItem('id_token', authResponse.token);
  } 

  logout(): void {
    localStorage.removeItem("id_token");
  }

  getToken(): string | null {
    return localStorage.getItem("id_token");
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return (!!token && !this.jwtHelper.isTokenExpired(token));
  }

  isLoggedOut(): boolean | null {
      return !this.isLoggedIn();
  }
}
