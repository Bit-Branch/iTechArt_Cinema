//External modules
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

//Angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SentenceCaseDirective } from '@core/directives/sentence-case.directive';

//Local modules
import { AuthHeaderInterceptor } from '@core/interceptors/auth-header.interceptor';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  exports: [SentenceCaseDirective],
  declarations: [SentenceCaseDirective],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: HTTP_INTERCEPTORS, useClass: AuthHeaderInterceptor, multi: true },
    JwtHelperService
  ]
})
export class CoreModule {
}
