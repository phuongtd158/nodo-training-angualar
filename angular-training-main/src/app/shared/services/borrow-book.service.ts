import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BorrowBookService {

    isCloseDialog: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );

    constructor(private readonly apiService: ApiService,
                private readonly toastService: ToastrService) {
    }

    getAllBorrowBook() {
        return this.apiService.getAllBorrowBook();
    }

    createBorrowBook(data: any) {
        return this.apiService.createBorrowBook(data).subscribe({
            next: (res) => {
                if (res.id) {
                    console.log(res);
                    this.toastService.success("Thêm muợn sách thành công !");
                    this.isCloseDialog.next(true);
                }
            },
            error: (err) => {
                console.error(err);
                this.isCloseDialog.next(false);
                this.toastService.error("Thêm muợn sách thất bại !");
                if (err.error.code == 'MAX') {
                    this.toastService.warning(err.error.message);
                    return;
                }
                if (err.error.code == 'DATE_INVALID') {
                    this.toastService.warning(err.error.message);
                    return;
                }
            }
        })
    }

    updateBorrowBook(data: any, id: number) {
        return this.apiService.updateBorrowBook(data, id).subscribe({
            next: (res) => {
                console.log(res);
                this.toastService.success("Cập nhật muợn sách thành công !");
                this.isCloseDialog.next(true);
            },
            error: (err) => {
                this.toastService.error("Cập nhật muợn sách thất bại !");
                this.isCloseDialog.next(false);
                if (err.error.code == 'MAX') {
                    this.toastService.warning(err.error.message);
                    return;
                }
                if (err.error.code == 'DATE_INVALID') {
                    this.toastService.warning(err.error.message);
                    return;
                }
            }
        })
    }

    deleteBorrowBook(id: number) {
        return this.apiService.deleteBorrowBook(id).subscribe({
            next: _ => {
                this.toastService.success("Xoá muợn sách thành công !");
            },
            error: (err) => {
                console.error(err);
                this.toastService.error("Xoá muợn sách thất bại !");
            }
        })
    }
}
