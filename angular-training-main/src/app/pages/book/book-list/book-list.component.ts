import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Constants} from "../../../shared/Constants";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ConfirmDialogComponent} from "../../../shared/components/confirm-dialog/confirm-dialog.component";
import {BookService} from "../../../shared/services/book.service";
import {MatDialog} from "@angular/material/dialog";
import {BookFormComponent} from "../book-form/book-form.component";

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

    displayedColumns: string[] = ['maSach', 'tenSach', 'chuDe', 'namXuatBan', 'moTa', 'soLuongConLai',
        'soLuongSachMuon', 'tongSoSach', 'tacGia', 'nhaXuatBan', 'Action'];
    dataSource!: MatTableDataSource<any>;
    TYPE_DIALOG = Constants.TYPE_DIALOG;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    books: any[] = [];

    constructor(private readonly bookService: BookService,
                private readonly matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getAllBook();
    }

    getAllBook() {
        this.bookService.getAllBook().subscribe({
            next: (data) => {
                this.books = data;
                this.dataSource = new MatTableDataSource<any>(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.dataSource.data = this.books;
            },
            error: (err) => {
                console.log(err)
            }
        })
    }

    openFormDialog(type: string, row?: any) {
        this.matDialog.open(BookFormComponent, {
            width: '50vw',
            disableClose: true,
            hasBackdrop: true,
            data: {
                type,
                row
            }
        }).afterClosed().subscribe(result => {
            if (result === Constants.RESULT_CLOSE_DIALOG.SUCCESS) {
                this.getAllBook();
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
                this.bookService.deleteBook(id);
                const index = this.dataSource.data.findIndex(d => d.id === id);
                this.books.splice(index, 1);
                this.dataSource.data = this.books;
            }
        })
    }

}
