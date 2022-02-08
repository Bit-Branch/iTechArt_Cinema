//External modules
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

//Angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

//Local modules
import { AuthHeaderInterceptor } from '@core/interceptors/auth-header.interceptor';

const modules = [CommonModule, HttpClientModule];

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules,
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: HTTP_INTERCEPTORS, useClass: AuthHeaderInterceptor, multi: true },
    JwtHelperService
  ]
})
export class CoreModule {
}
