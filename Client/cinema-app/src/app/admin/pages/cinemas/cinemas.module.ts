//Angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Material modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

//Components
import { CinemasComponent } from '@admin/pages/cinemas/cinemas.component';

@NgModule({
  declarations: [
    CinemasComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class CinemasModule {
}
