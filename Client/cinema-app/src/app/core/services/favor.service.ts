import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Favor } from '@core/models/favor';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class FavorService {
  constructor(
    private readonly http: HttpClient
  ) {
  }

  createFavor(favor: FormData): Observable<number> {
    return this.http.post<number>(`${environment.hostUrl}/api/favors/create`, favor);
  }

  getAllFavors(): Observable<Favor[]> {
    return this.http.get<Favor[]>(`${environment.hostUrl}/api/favors`);
  }
}
