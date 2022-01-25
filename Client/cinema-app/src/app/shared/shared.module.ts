//Angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Local modules
import { LoginModule } from '@login/login.module';
import { NavbarModule } from '@shared/layout/navbar/navbar.module';

const sharedModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  LoginModule,
  NavbarModule
];

@NgModule({
  imports: sharedModules,
  exports: sharedModules,
  declarations: []
})
export class SharedModule {
}
