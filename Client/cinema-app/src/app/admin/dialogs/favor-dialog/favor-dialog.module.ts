//External modules
import { MaterialFileInputModule } from 'ngx-material-file-input';

//Angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

//Material modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

//Local
import { CoreModule } from '@core/core.module';

//Components
import { FavorDialogComponent } from '@admin/dialogs/favor-dialog/favor-dialog.component';

@NgModule({
  declarations: [
    FavorDialogComponent
  ],
  exports: [
    FavorDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialFileInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    CoreModule
  ]
})
export class FavorDialogModule {
}
