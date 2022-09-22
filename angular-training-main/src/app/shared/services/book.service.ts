import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {ToastrService} from "ngx-toastr";
import {catchError} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BookService {

    isCloseDialog: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );

    constructor(private apiService: ApiService,
                private readonly toastService: ToastrService) {
    }

    getBook(id: number) {
        return this.apiService.getBook(id);
    }

    getAllBook() {
        return this.apiService.getAllBook();
    }

    createBook(data: any) {
        return this.apiService.createBook(data).pipe(
        ).subscribe({
            next: (res) => {
                if (res.id) {
                    console.log(res);
                    this.toastService.success("Thêm sách thành công !");
                    this.isCloseDialog.next(true);
                }
            },
            error: (err) => {
                console.error(err);
                this.toastService.error("Thêm sách thất bại !");
                this.isCloseDialog.next(false);
            }
        })
    }

    updateBook(data: any, id: number) {
        return this.apiService.updateBook(data, id).subscribe({
            next: (res) => {
                console.log(res);
                this.toastService.success("Cập nhật sách thành công !");
                this.isCloseDialog.next(true);
            },
            error: (err) => {
                console.error(err);
                if (err.error.code == 'MAX_TOTAL') {
                    this.toastService.warning(err.error.message);
                }
                this.toastService.error("Cập nhật sách thất bại !");
                this.isCloseDialog.next(false);
            }
        })
    }

    deleteBook(id: number) {
        return this.apiService.deleteBook(id).subscribe({
            next: _ => {
                this.toastService.success("Xoá sách thành công !");
            },
            error: (err) => {
                console.error(err);
                this.toastService.error("Xoá sách thất bại !");
            }
        })
    }
}
