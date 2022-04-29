//External modules
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

//Angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

//Local modules
import { ImageBase64UrlPipe } from '@core/pipes/image-base64-url.pipe';
import { LoadingInterceptor } from '@core/interceptors/loading.interceptor';
import { AuthHeaderInterceptor } from '@core/interceptors/auth-header.interceptor';
import { SentenceCaseDirective } from '@core/directives/sentence-case.directive';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  exports: [SentenceCaseDirective, ImageBase64UrlPipe],
  declarations: [SentenceCaseDirective, ImageBase64UrlPipe],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthHeaderInterceptor, multi: true },
    JwtHelperService
  ]
})
export class CoreModule {
}
