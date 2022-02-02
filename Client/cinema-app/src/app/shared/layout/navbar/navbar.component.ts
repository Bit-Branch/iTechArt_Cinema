import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from '@core/services/auth.service';
import { LoginComponent } from '@login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
    private readonly dialog: MatDialog,
    private readonly authService: AuthService
  ) {
  }

  openLoginDialog(): void {
    this.dialog.open(LoginComponent);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
  }

  listPurchases(): void {
    throw new Error('Method not implemented yet.');
  }
}
