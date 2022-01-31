import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Token } from '@core/models/token';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '@environment/environment';
import { AuthResponse } from '@core/models/auth-response';

const tokenId = 'id_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly jwtHelper: JwtHelperService
  ) {
  }

  register(email: string, password: string): Observable<string> {
    return this.http.post(`${environment.hostUrl}/api/users/register`, { email, password }, { responseType: 'text' });
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.hostUrl}/api/users/authenticate`, { email, password })
      .pipe(
        tap((response: AuthResponse) => this.setSession(response.token))
      );
  }

  logout(): void {
    localStorage.removeItem(tokenId);
  }

  getToken(): string | null {
    return localStorage.getItem(tokenId);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return (!!token && !this.jwtHelper.isTokenExpired(token));
  }

  isAdmin(): boolean {
    if(this.isLoggedIn()) {
      const decodedToken: Token = this.jwtHelper.decodeToken(this.getToken() as string);
      return decodedToken.role === 'Admin'; // need to be in CurrentRole variable
    }
    return false;
  }

  private setSession(token: string): void {
    localStorage.setItem(tokenId, token);
  }
}
