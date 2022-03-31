import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { AuthService } from '@core/services/auth.service';
import { LoginComponent } from '@login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanLoad {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) {
  }

  canLoad(): boolean {
    if (this.authService.isAdmin()) {
      return true;
    } else {
      this.dialog.open(LoginComponent);
      return false;
    }
  }
}
