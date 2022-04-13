import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { DynamicallyApplyPipe } from './pipes/dynamically-apply.pipe';
import { EditableTableComponent } from './editable-table/editable-table.component';

@NgModule({
  declarations: [
    EditableTableComponent,
    DynamicallyApplyPipe
  ],
  exports: [
    EditableTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class EditableTableModule {
}
