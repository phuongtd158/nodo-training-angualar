import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Constants} from "../../../shared/Constants";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {OptionSetFormComponent} from "../option-set-form/option-set-form.component";
import {OptionSetValueFormComponent} from "../option-set-value-form/option-set-value-form.component";
import {OptionSetService} from "../../../shared/services/option-set.service";
import {OptionSetValueService} from "../../../shared/services/option-set-value.service";
import {BehaviorSubject} from "rxjs";
import {FormArray, FormBuilder, FormControl} from "@angular/forms";
import {ConfirmDialogComponent} from "../../../shared/components/confirm-dialog/confirm-dialog.component";

@Component({
    selector: 'app-option-list',
    templateUrl: './option-list.component.html',
    styleUrls: ['./option-list.component.scss']
})
export class OptionListComponent implements OnInit {

    TYPE_DIALOG = Constants.TYPE_DIALOG;
    idOptionSet: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    displayedColumnsOptionSet: string[] = ['code', 'name', 'effectiveDate', 'expirationDate', 'status',
        'createdDate', 'creator', 'updatedDate', 'Action'];
    displayedColumnsOptionSetValue: string[] = ['code', 'name', 'group', 'effectiveDate', 'expirationDate', 'status',
        'createdDate', 'creator', 'updatedDate', 'Action'];

    dataSourceOptionSet!: MatTableDataSource<any>;
    dataSourceOptionSetValue!: MatTableDataSource<any>;

    @ViewChild('paginatorOptionSet') paginatorOptionSet!: MatPaginator;
    @ViewChild('paginatorOptionSetValue') paginatorOptionSetValue!: MatPaginator;
    @ViewChild('matSort1') sortOptionSet!: MatSort;
    @ViewChild('matSort2') sortOptionSetValue!: MatSort;

    search = this.fb.group({
        code: [''],
        name: [''],
        status: [null]
    })
    searchOptionSetValueForm = this.fb.group({
        code: [''],
        name: [''],
        status: [null]
    })

    constructor(private readonly matDialog: MatDialog,
                private readonly optionSetService: OptionSetService,
                private readonly optionSetValueService: OptionSetValueService,
                private readonly fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.getAllOptionSet();
    }

    getAllOptionSet() {
        return this.optionSetService.getAllOptionSet().subscribe({
            next: (res) => {
                if (res.length > 0) {
                    this.getAllOptionSetValueById(res[0].id, "NEXT");
                }
                this.dataSourceOptionSet = new MatTableDataSource<any>(res);
                this.dataSourceOptionSet.data = res;
                this.dataSourceOptionSet.paginator = this.paginatorOptionSet;
                this.dataSourceOptionSet.sort = this.sortOptionSet;
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

    openFormDialogOptionSet(type: string, row?: any) {
        this.matDialog.open(OptionSetFormComponent, {
            width: '50vw',
            disableClose: true,
            hasBackdrop: true,
            data: {
                type,
                row
            }
        }).afterClosed().subscribe(result => {
            if (result === Constants.RESULT_CLOSE_DIALOG.SUCCESS) {
                this.getAllOptionSet();
            }
        })
    }

    openFormDialogOptionSetValue(type: string, row?: any) {
        this.matDialog.open(OptionSetValueFormComponent, {
            width: '50vw',
            disableClose: true,
            hasBackdrop: true,
            data: {
                type,
                row
            }
        }).afterClosed().subscribe(result => {
            if (result === Constants.RESULT_CLOSE_DIALOG.SUCCESS) {
                this.idOptionSet.subscribe(id => {
                    if (id) {
                        this.getAllOptionSetValueById(id, "ALL");
                    }
                })
            }
        })
    }

    getAllOptionSetValueById(id: number, type?: string) {
        if (type === 'NEXT') {
            this.idOptionSet.next(id);
        }
        return this.optionSetValueService.getAllOptionSetValueById(id).subscribe({
            next: (res) => {
                this.dataSourceOptionSetValue = new MatTableDataSource<any>(res);
                this.dataSourceOptionSetValue.data = res;
                this.dataSourceOptionSetValue.paginator = this.paginatorOptionSetValue;
                this.dataSourceOptionSetValue.sort = this.sortOptionSetValue;
            },
            error: (err) => {
                console.log(err)
            }
        })
    }

    onDelete(row: any, type?: string) {
        this.matDialog.open(ConfirmDialogComponent, {
            width: '25vw',
            disableClose: true,
            hasBackdrop: true,
            data: {
                message: 'Bạn có muốn xóa bản ghi này?'
            }
        }).afterClosed().subscribe(result => {
            if (result === Constants.RESULT_CLOSE_DIALOG.CONFIRM) {
                row.status = 0;
                if (type === 'OPTION_SET') {
                    this.optionSetService.updateOptionSet(row.id, row);
                } else {
                    this.optionSetValueService.updateOptionSetValue(row.id, row);
                }
            }
        })
    }

    searchOption() {
        const status = [];
        status.push(this.search.getRawValue().status)
        let param = '';
        const data = {
            name: this.search.getRawValue().name.trim(),
            code: this.search.getRawValue().code.trim(),
            status: status
        }

        if (data.name !== '') param = 'name=' + data.name + '&';
        if (data.code !== '') param += 'code=' + data.code + '&';
        if (data.status[0] != null) {
            for (let i = 0; i < data.status.length; i++) {
                param += 'status=' + data.status[i] + '&'
            }
        }
        console.log(param);
        return this.optionSetService.searchOptionSet(param).subscribe((res: any) => {
            if (res.length > 0) {
                this.getAllOptionSetValueById(res[0].id, "NEXT");
            }
            this.dataSourceOptionSet = new MatTableDataSource<any>(res);
            this.dataSourceOptionSet.data = res;
            this.dataSourceOptionSet.paginator = this.paginatorOptionSet;
            this.dataSourceOptionSet.sort = this.sortOptionSet;
        })
    }

    searchOptionSetValue() {
        const status = [];
        let idOptionSet = -1;
        status.push(this.searchOptionSetValueForm.getRawValue().status)
        let param = '';
        this.idOptionSet.subscribe(id => {
            if (id) {
                idOptionSet = id;
            }
        })
        const data = {
            idOptionSet: idOptionSet,
            name: this.searchOptionSetValueForm.getRawValue().name.trim(),
            code: this.searchOptionSetValueForm.getRawValue().code.trim(),
            status: status
        }

        param = 'idOptionSet=' + data.idOptionSet + '&';
        if (data.name !== '') param += 'name=' + data.name + '&';
        if (data.code !== '') param += 'code=' + data.code + '&';

        if (data.status[0] != null) {
            for (let i = 0; i < data.status.length; i++) {
                param += 'status=' + data.status[i] + '&'
            }
        }
        console.log(param)
        return this.optionSetValueService.searchOptionSetValue(param).subscribe((res: any) => {
            this.dataSourceOptionSetValue = new MatTableDataSource<any>(res);
            this.dataSourceOptionSetValue.data = res;
            this.dataSourceOptionSetValue.paginator = this.paginatorOptionSetValue;
            this.dataSourceOptionSetValue.sort = this.sortOptionSetValue;
        })
    }
}
