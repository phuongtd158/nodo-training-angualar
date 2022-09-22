import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PublisherRoutingModule} from './publisher-routing.module';
import {PublisherListComponent} from './publisher-list/publisher-list.component';
import {PublisherFormComponent} from "./publisher-form/publisher-form.component";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatRadioModule} from "@angular/material/radio";


@NgModule({
    declarations: [
        PublisherListComponent,
        PublisherFormComponent
    ],
    imports: [
        CommonModule,
        PublisherRoutingModule,
        MatInputModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatButtonModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatRadioModule
    ]
})
export class PublisherModule {
}
