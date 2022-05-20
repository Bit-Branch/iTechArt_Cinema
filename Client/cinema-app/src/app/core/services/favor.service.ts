import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Favor } from '@core/models/favor/favor';
import { CreateFavor } from '@core/models/favor/create-favor';
import { PaginationResult } from '@core/models/pagination-result/pagination-result';
import { UpdateFavor } from '@core/models/favor/update-favor';
import { convertTableCurrentStateToHttpParams } from '@core/utils/convert-table-state-to-http-params';
import { environment } from '@environment/environment';
import { TableCurrentState } from '@shared/elements/editable-table/interfaces/table-current-state';

@Injectable({
  providedIn: 'root'
})
export class FavorService {
  constructor(
    private readonly http: HttpClient
  ) {
  }

  uploadImage(image: FormData): Observable<number> {
    return this.http.post<number>(`${environment.hostUrl}/api/favors/image`, image);
  }

  createFavor(favor: CreateFavor): Observable<number> {
    return this.http.post<number>(`${environment.hostUrl}/api/favors`, favor);
  }

  getAllFavors(): Observable<Favor[]> {
    return this.http.get<Favor[]>(`${environment.hostUrl}/api/favors`);
  }

  findAllBySearchTerm(term: string): Observable<Favor[]> {
    return this.http.get<Favor[]>(
      `${environment.hostUrl}/api/favors`,
      { params: new HttpParams().set('term', term) }
    );
  }

  deleteFavor(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.hostUrl}/api/favors/${id}`);
  }

  editImage(image: FormData): Observable<number> {
    return this.http.put<number>(`${environment.hostUrl}/api/favors/image`, image);
  }

  updateFavor(favor: UpdateFavor): Observable<number> {
    return this.http.put<number>(`${environment.hostUrl}/api/favors`, favor);
  }

  getFavorImage(imageId: number): Observable<{ id: number, content: string }> {
    return this.http.get<{ id: number, content: string }>(
      `${environment.hostUrl}/api/favors/image`,
      { params: new HttpParams().set('imageId', imageId) }
    );
  }

  getAllFavorsPaged(tableState: TableCurrentState): Observable<PaginationResult<Favor>> {
    const params = convertTableCurrentStateToHttpParams(tableState);
    return this.http.get<PaginationResult<Favor>>(
      `${environment.hostUrl}/api/favors`,
      { params }
    );
  }
}
