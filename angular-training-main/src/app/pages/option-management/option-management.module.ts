import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OptionManagementRoutingModule} from './option-management-routing.module';
import {OptionSetFormComponent} from './option-set-form/option-set-form.component';
import {OptionListComponent} from './option-list/option-list.component';
import {OptionSetValueFormComponent} from './option-set-value-form/option-set-value-form.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";


@NgModule({
    declarations: [
        OptionSetFormComponent,
        OptionListComponent,
        OptionSetValueFormComponent
    ],
    imports: [
        CommonModule,
        OptionManagementRoutingModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ]
})
export class OptionManagementModule {
}
