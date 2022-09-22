import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Constants} from "../../../shared/Constants";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../shared/components/confirm-dialog/confirm-dialog.component";
import {PublisherService} from "../../../shared/services/publisher.service";
import {PublisherFormComponent} from "../publisher-form/publisher-form.component";

@Component({
    selector: 'app-publisher-list',
    templateUrl: './publisher-list.component.html',
    styleUrls: ['./publisher-list.component.scss']
})
export class PublisherListComponent implements OnInit {

    displayedColumns: string[] = ['maNxb', 'tenNxb', 'diaChi', 'moTa', 'trangThai', 'Action'];
    dataSource!: MatTableDataSource<any>;
    TYPE_DIALOG = Constants.TYPE_DIALOG;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    publishers: [] = [];

    constructor(private readonly publisherService: PublisherService,
                private readonly matDialog: MatDialog) {
    }


    ngOnInit(): void {
        this.getAllPublisher();
    }

    getAllPublisher() {
        this.publisherService.getAllPublisher().subscribe({
            next: (data) => {
                this.publishers = data;
                this.dataSource = new MatTableDataSource<any>(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.dataSource.data = this.publishers;
            },
            error: (err) => {
                console.log(err)
            }
        })
    }

    openFormDialog(type: string, row?: any) {
        this.matDialog.open(PublisherFormComponent, {
            width: '50vw',
            disableClose: true,
            hasBackdrop: true,
            data: {
                type,
                row
            }
        }).afterClosed().subscribe(result => {
            if (result === Constants.RESULT_CLOSE_DIALOG.SUCCESS) {
                this.getAllPublisher();
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
                this.publisherService.deletePublisher(id);
                const index = this.dataSource.data.findIndex(d => d.id === id);
                this.publishers.splice(index, 1);
                this.dataSource.data = this.publishers;
            }
        })
    }

}
