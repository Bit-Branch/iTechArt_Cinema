//Angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Material modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

//Components
import { MoviesComponent } from '@admin/pages/movies/movies.component';

@NgModule({
  declarations: [
    MoviesComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class MoviesModule {
}
