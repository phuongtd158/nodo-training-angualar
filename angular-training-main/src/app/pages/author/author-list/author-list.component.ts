import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AuthorService} from "../../../shared/services/author.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {AuthorFormComponent} from "../author-form/author-form.component";
import {Constants} from "../../../shared/Constants";
import {ConfirmDialogComponent} from "../../../shared/components/confirm-dialog/confirm-dialog.component";

@Component({
    selector: 'app-author-list',
    templateUrl: './author-list.component.html',
    styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent implements OnInit {

    displayedColumns: string[] = ['maTacGia', 'tenTacGia', 'sdt', 'diachi', 'mota', 'Action'];
    dataSource!: MatTableDataSource<any>;
    TYPE_DIALOG = Constants.TYPE_DIALOG;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    authors: any[] = [];

    constructor(private readonly authorService: AuthorService,
                private readonly matDialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.getAllAuthor();
    }

    getAllAuthor() {
        this.authorService.getAllAuthor().subscribe({
            next: (data) => {
                this.authors = data;
                this.dataSource = new MatTableDataSource<any>(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.dataSource.data = this.authors;
            },
            error: (err) => {
                console.log(err)
            }
        })
    }

    openFormDialog(type: string, row?: any) {
        this.matDialog.open(AuthorFormComponent, {
            width: '50vw',
            disableClose: true,
            hasBackdrop: true,
            data: {
                type,
                row
            }
        }).afterClosed().subscribe(result => {
            if (result === Constants.RESULT_CLOSE_DIALOG.SUCCESS) {
                this.getAllAuthor();
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
                this.authorService.deleteAuthor(id);
                const index = this.dataSource.data.findIndex(d => d.id === id);
                this.authors.splice(index, 1);
                this.dataSource.data = this.authors;
            }
        })
    }
}

