import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

const sharedModules: any[] = [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
];

@NgModule({
    imports: sharedModules,
    exports: sharedModules,
    declarations: []
})

export class SharedModule { }