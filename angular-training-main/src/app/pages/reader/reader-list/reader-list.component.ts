import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Constants} from "../../../shared/Constants";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ReaderService} from "../../../shared/services/reader.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../shared/components/confirm-dialog/confirm-dialog.component";
import {ReaderFormComponent} from "../reader-form/reader-form.component";
import {finalize, tap} from "rxjs";

@Component({
    selector: 'app-reader-list',
    templateUrl: './reader-list.component.html',
    styleUrls: ['./reader-list.component.scss']
})
export class ReaderListComponent implements OnInit {

    displayedColumns: string[] = ['maBanDoc', 'tenBanDoc', 'sdt', 'diaChi', 'ngaySinh', 'ngayTaoTaiKhoan', 'hang', 'Action'];
    dataSource!: MatTableDataSource<any>;
    TYPE_DIALOG = Constants.TYPE_DIALOG;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    readers: any[] = [];

    constructor(private readonly readerService: ReaderService,
                private readonly matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getAllReader();
    }

    getAllReader() {
        this.readerService.getAllReader().subscribe({
            next: (data) => {
                this.readers = data;
                this.dataSource = new MatTableDataSource<any>(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.dataSource.data = this.readers;
            },
            error: (err) => {
                console.log(err)
            }
        })
    }

    openFormDialog(type: string, row?: any) {
        this.matDialog.open(ReaderFormComponent, {
            width: '50vw',
            disableClose: true,
            hasBackdrop: true,
            data: {
                type,
                row
            }
        }).afterClosed().subscribe(result => {
            if (result === Constants.RESULT_CLOSE_DIALOG.SUCCESS) {
                this.getAllReader();
            }
        })
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    onDelete(id: number) {
        this.matDialog.open(ConfirmDialogComponent, {
            width: '25vw',
            disableClose: true,
            hasBackdrop: true,
            data: {
                message: 'Bạn có muốn xóa bản ghi này?'
            }
        }).afterClosed().subscribe(result => {
            if (result === Constants.RESULT_CLOSE_DIALOG.CONFIRM) {
                this.readerService.deleteReader(id);
                const index = this.dataSource.data.findIndex(d => d.id === id);
                this.readers.splice(index, 1);
                this.dataSource.data = this.readers;
            }
        })
    }

}
