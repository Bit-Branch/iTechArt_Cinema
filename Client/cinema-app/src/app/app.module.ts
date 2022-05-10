//Angular modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Local modules
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from '@core/core.module';
import { ClientPortalModule } from '@client-portal/client-portal.module';
import { SharedModule } from '@shared/shared.module';

//Components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    ClientPortalModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
