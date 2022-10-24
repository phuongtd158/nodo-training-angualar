import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Constants} from "../../../shared/Constants";
import {BorrowBookService} from "../../../shared/services/borrow-book.service";
import {ReaderService} from "../../../shared/services/reader.service";
import {BookService} from "../../../shared/services/book.service";

@Component({
    selector: 'app-borrow-book-form',
    templateUrl: './borrow-book-form.component.html',
    styleUrls: ['./borrow-book-form.component.scss']
})
export class BorrowBookFormComponent implements OnInit {

    title: string = '';
    books: any[] = [];
    readers: any[] = [];
    totalBook!: number;

    borrowBookForm = this.fb.group({
        id: '',
        banDoc: this.fb.group({
            id: ['', [Validators.required]]
        }),
        sach: this.fb.group({
            id: ['', [Validators.required]]
        }),
        category:this.fb.group({
            id: ['',]
        }),
        soLuong: ['', [Validators.required, Validators.min(1), Validators.max(9)]],
        ngayGioMuon: ['', [Validators.required]],
        ngayGioTra: ['', [Validators.required]],
        trangThai: [1, [Validators.required]],
        ghiChu: [''],
    })

    constructor(private readonly fb: FormBuilder,
                private readonly borrowBook: BorrowBookService,
                private readonly readerService: ReaderService,
                private readonly bookService: BookService,
                private readonly dialogRef: MatDialogRef<BorrowBookFormComponent>,
                @Inject(MAT_DIALOG_DATA) public dataDialog: any) {
    }

    ngOnInit(): void {
        if (this.dataDialog.type === Constants.TYPE_DIALOG.NEW) {
            this.title = 'Thêm mới sách mượn';
            this.borrowBookForm.controls['trangThai'].disable();
        } else {
            this.title = 'Cập nhật sách mượn';
            this.borrowBookForm.controls['banDoc'].disable();
            this.borrowBookForm.controls['sach'].disable();
            this.borrowBookForm.patchValue(this.dataDialog.row);
        }
        this.getAllBook();
        this.getAllReader();
    }

    onDismiss() {
        this.dialogRef.close(Constants.RESULT_CLOSE_DIALOG.CLOSE);
    }

    getAllReader() {
        this.readerService.getAllReader().subscribe(data => {
            this.readers = data;
        });
    }

    getAllBook() {
        this.bookService.getAllBook().subscribe(data => {
            this.books = data;
        });
    }

    save() {
        this.borrowBookForm.markAllAsTouched();
        if (this.borrowBookForm.invalid) {
            return;
        }

        if (this.dataDialog.type === Constants.TYPE_DIALOG.NEW) {
            this.borrowBook.createBorrowBook(this.borrowBookForm.getRawValue());
        } else {
            this.borrowBook.updateBorrowBook(this.borrowBookForm.getRawValue(), this.dataDialog.row.id);
        }
        this.borrowBook.isCloseDialog.subscribe(value => {
            console.log(value)
            if (value) {
                console.log(value);
                this.dialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
                this.borrowBook.isCloseDialog.next(false);
            }
        })
    }
}
