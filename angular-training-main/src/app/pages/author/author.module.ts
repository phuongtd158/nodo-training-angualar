import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthorRoutingModule} from './author-routing.module';
import {MatInputModule} from "@angular/material/input";
import {AuthorListComponent} from "./author-list/author-list.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {AuthorFormComponent} from "./author-form/author-form.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        AuthorListComponent,
        AuthorFormComponent
    ],
    imports: [
        CommonModule,
        AuthorRoutingModule,
        MatInputModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatButtonModule,
        MatDialogModule,
        ReactiveFormsModule
    ]
})
export class AuthorModule {
}
