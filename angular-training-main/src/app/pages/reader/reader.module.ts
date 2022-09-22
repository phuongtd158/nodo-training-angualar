import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReaderRoutingModule} from './reader-routing.module';
import {ReaderListComponent} from './reader-list/reader-list.component';
import {ReaderFormComponent} from './reader-form/reader-form.component';
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";


@NgModule({
    declarations: [
        ReaderListComponent,
        ReaderFormComponent
    ],
    imports: [
        CommonModule,
        ReaderRoutingModule,
        MatInputModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatButtonModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ]
})
export class ReaderModule {
}
