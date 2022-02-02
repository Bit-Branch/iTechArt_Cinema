//Angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

//Local modules
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

const modules = [CommonModule, HttpClientModule];

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules,
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ]
})
export class CoreModule {
}
