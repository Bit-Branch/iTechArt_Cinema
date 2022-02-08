import { filter } from 'rxjs';

import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event => {
      console.log((event as NavigationEnd).url);
    }));
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
