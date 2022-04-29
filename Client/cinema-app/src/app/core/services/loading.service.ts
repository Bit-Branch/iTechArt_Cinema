import { Observable, Subject } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading$: Observable<boolean>;
  private readonly isLoadingSubject = new Subject<boolean>();

  constructor() {
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  show() {
    this.isLoadingSubject.next(true);
  }

  hide() {
    this.isLoadingSubject.next(false);
  }
}
