import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environment/environment';
import { Roles } from '@core/constants/roles';
import { AuthenticationRequest } from '@core/models/authentication/authentication-request';
import { RegistrationRequest } from '@core/models/registration/registration-request';
import { AuthenticationResponse } from '@core/models/authentication/authentication-response';

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

  register(registrationRequest: RegistrationRequest): Observable<string> {
    return this.http.post(`${environment.hostUrl}/api/users/register`, registrationRequest, { responseType: 'text' }
    );
  }

  login(authRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${environment.hostUrl}/api/users/authenticate`, authRequest)
      .pipe(
        tap((response: AuthenticationResponse) => this.setSession(response.token))
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
    if (this.isLoggedIn()) {
      const decodedToken = this.jwtHelper.decodeToken<{ role: string }>(this.getToken() as string);
      return decodedToken.role === Roles.ADMIN;
    }
    return false;
  }

  private setSession(token: string): void {
    localStorage.setItem(tokenId, token);
  }
}
