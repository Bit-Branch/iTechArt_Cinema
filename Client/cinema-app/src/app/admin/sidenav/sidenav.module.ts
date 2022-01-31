//Angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//Material modules
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

//Custom modules
import { CreateMovieModule } from '@admin/pages/create-movie/create-movie.module';
import { NavbarModule } from '@shared/layout/navbar/navbar.module';

//Components
import { SidenavComponent } from './sidenav.component';

@NgModule({
  declarations: [
    SidenavComponent
  ],
  exports: [
    SidenavComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    CreateMovieModule,
    RouterModule,
    NavbarModule
  ]
})
export class SidenavModule {
}
