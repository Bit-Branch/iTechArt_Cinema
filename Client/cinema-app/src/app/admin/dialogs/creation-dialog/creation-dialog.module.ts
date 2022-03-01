//Angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

//Material modules
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

//Local modules
import { CoreModule } from '@core/core.module';

//Components
import { CreationDialogComponent } from '@admin/dialogs/creation-dialog/creation-dialog.component';

@NgModule({
  declarations: [
    CreationDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    CoreModule
  ]
})
export class CreationDialogModule {
}
