import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule} from '@angular/material/icon';
import { MatDialogModule} from '@angular/material/dialog';
import { MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';

const modules = [MatToolbarModule, 
                 MatButtonModule, 
                 MatFormFieldModule, 
                 MatIconModule, 
                 MatDialogModule, 
                 MatInputModule, 
                 MatSelectModule, 
                 MatProgressBarModule, 
                 MatDividerModule, 
                 MatMenuModule,
                ]

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule { }
