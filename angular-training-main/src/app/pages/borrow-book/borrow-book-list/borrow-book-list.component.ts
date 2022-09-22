import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Constants} from "../../../shared/Constants";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../shared/components/confirm-dialog/confirm-dialog.component";
import {BorrowBookService} from "../../../shared/services/borrow-book.service";
import {BorrowBookFormComponent} from "../borrow-book-form/borrow-book-form.component";

@Component({
  selector: 'app-borrow-book-list',
  templateUrl: './borrow-book-list.component.html',
  styleUrls: ['./borrow-book-list.component.scss']
})
export class BorrowBookListComponent implements OnInit {

    displayedColumns: string[] = ['banDoc', 'sach', 'soLuong', 'ngayGioMuon', 'ngayGioTra', 'trangThai', 'ghiChu', 'Action'];
    dataSource!: MatTableDataSource<any>;
    TYPE_DIALOG = Constants.TYPE_DIALOG;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    borrowBooks: any[] = [];

    constructor(private readonly borrowBookService: BorrowBookService,
                private readonly matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getAllBorrowBook();
    }

    getAllBorrowBook() {
        this.borrowBookService.getAllBorrowBook().subscribe({
            next: (data) => {
                this.borrowBooks = data;
                this.dataSource = new MatTableDataSource<any>(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.dataSource.data = this.borrowBooks;
            },
            error: (err) => {
                console.log(err)
            }
        })
    }

    openFormDialog(type: string, row?: any) {
        this.matDialog.open(BorrowBookFormComponent, {
            width: '50vw',
            disableClose: true,
            hasBackdrop: true,
            data: {
                type,
                row
            }
        }).afterClosed().subscribe(result => {
            if (result === Constants.RESULT_CLOSE_DIALOG.SUCCESS) {
                this.getAllBorrowBook();
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
                this.borrowBookService.deleteBorrowBook(id);
                const index = this.dataSource.data.findIndex(d => d.id === id);
                this.borrowBooks.splice(index, 1);
                this.dataSource.data = this.borrowBooks;
            }
        })
    }

}
