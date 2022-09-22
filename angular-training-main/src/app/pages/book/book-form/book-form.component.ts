import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {BookService} from "../../../shared/services/book.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Constants} from "../../../shared/Constants";
import {PublisherService} from "../../../shared/services/publisher.service";
import {AuthorService} from "../../../shared/services/author.service";

@Component({
    selector: 'app-book-form',
    templateUrl: './book-form.component.html',
    styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

    title: string = '';
    publishers: any[] = [];
    authors: any[] = [];

    bookForm = this.fb.group({
        id: [''],
        maSach: [''],
        chuDe: ['', [Validators.required]],
        namXuatBan: [new Date()],
        moTa: ['', []],
        tongSoSach: ['', [Validators.required, Validators.min(1), Validators.max(9999)]],
        soLuongSachMuon: [0],
        soLuongConLai: [''],
        tenSach: ['', [Validators.required]],
        tacGia: this.fb.group({
            id: ['', [Validators.required]]
        }),
        nhaXuatBan: this.fb.group({
            id: ['', [Validators.required]]
        })
    })

    constructor(private readonly fb: FormBuilder,
                private readonly bookService: BookService,
                private readonly publisherService: PublisherService,
                private readonly authorService: AuthorService,
                private readonly dialogRef: MatDialogRef<BookFormComponent>,
                @Inject(MAT_DIALOG_DATA) public dataDialog: any) {
    }

    ngOnInit(): void {

        if (this.dataDialog.type === Constants.TYPE_DIALOG.NEW) {
            this.title = 'Thêm mới sách'
        } else {
            this.bookForm.controls['maSach'].disable();
            this.bookForm.patchValue(this.dataDialog.row);
        }
        this.getAllPublisher();
        this.getAllAuthor();
    }

    getAllPublisher() {
        this.publisherService.getAllPublisher().subscribe(data => {
            this.publishers = data;
        })
    }

    getAllAuthor() {
        this.authorService.getAllAuthor().subscribe(data => {
            this.authors = data;
        })
    }

    onDismiss() {
        this.dialogRef.close(Constants.RESULT_CLOSE_DIALOG.CLOSE);
    }

    save() {
        this.bookForm.markAllAsTouched();
        if (this.bookForm.invalid) {
            return;
        }
        if (this.dataDialog.type === Constants.TYPE_DIALOG.NEW) {
            this.bookService.createBook(this.bookForm.getRawValue());
        } else {
            this.bookService.updateBook(this.bookForm.getRawValue(), this.dataDialog.row.id);
        }
        this.bookService.isCloseDialog.subscribe(value => {
            console.log(value)
            if (value) {
                console.log(value);
                this.dialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
                this.bookService.isCloseDialog.next(false);
            }
        })
    }

}
