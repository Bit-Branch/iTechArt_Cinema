//Angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Local modules
import { LoginModule } from '@login/login.module';
import { LoadingSpinnerModule } from '@shared/elements/loading-spinner/loading-spinner.module';
import { SearchSelectModule } from '@shared/elements/search-select/search-select.module';
import { ConfirmDialogModule } from '@shared/layout/confirm-dialog/confirm-dialog.module';
import { NavbarModule } from '@shared/layout/navbar/navbar.module';
import { SidenavModule } from '@shared/layout/sidenav/sidenav.module';

const sharedModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  LoginModule,
  NavbarModule,
  SidenavModule,
  SearchSelectModule,
  ConfirmDialogModule,
  LoadingSpinnerModule
];

@NgModule({
  imports: sharedModules,
  exports: sharedModules
})
export class SharedModule {
}
