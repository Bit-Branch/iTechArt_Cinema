import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Hall } from '@core/models/hall';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class HallService {
  constructor(
    private readonly http: HttpClient
  ) {
  }

  createHall(hall: Hall): Observable<number> {
    return this.http.post<number>(`${environment.hostUrl}/api/halls/create`, hall);
  }

  findAllByCinemaId(id: number): Observable<Hall[]> {
    return this.http.get<Hall[]>(`${environment.hostUrl}/api/halls?cinemaId=${id}`);
  }
}
