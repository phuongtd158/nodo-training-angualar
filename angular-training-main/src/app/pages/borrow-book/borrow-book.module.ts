import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BorrowBookRoutingModule} from './borrow-book-routing.module';
import {BorrowBookListComponent} from './borrow-book-list/borrow-book-list.component';
import {BorrowBookFormComponent} from './borrow-book-form/borrow-book-form.component';
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";


@NgModule({
    declarations: [
        BorrowBookListComponent,
        BorrowBookFormComponent
    ],
    imports: [
        CommonModule,
        BorrowBookRoutingModule,
        MatInputModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatButtonModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatSelectModule,
        NgxMaterialTimepickerModule,
    ]
})
export class BorrowBookModule {
}
