import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {ToastrService} from "ngx-toastr";
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthorService {

    isCloseDialog: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );

    constructor(private readonly apiService: ApiService,
                private readonly toastService: ToastrService) {
    }

    getAllAuthor() {
        return this.apiService.getAllAuthor();
    }

    createAuthor(data: any) {
        return this.apiService.createAuthor(data).subscribe({
            next: (res) => {
                if (res.id) {
                    console.log(res);
                    this.toastService.success("Thêm tác giả thành công !");
                    this.isCloseDialog.next(true);
                }
            },
            error: (err) => {
                console.error(err);
                this.toastService.error("Thêm tác giả thất bại !");
                this.isCloseDialog.next(false);
            }
        })
    }

    updateAuthor(data: any, id: number) {
        return this.apiService.updateAuthor(data, id).subscribe({
            next: (res) => {
                console.log(res);
                this.toastService.success("Cập nhật tác giả thành công !");
                this.isCloseDialog.next(true);
            },
            error: (err) => {
                console.error(err);
                this.toastService.error("Cập nhật tác giả thất bại !");
                this.isCloseDialog.next(false);
            }
        })
    }

    deleteAuthor(id: number) {
        return this.apiService.deleteAuthor(id).subscribe({
            next: _ => {
                this.toastService.success("Xoá tác giả thành công !");
            },
            error: (err) => {
                console.error(err);
                this.toastService.error("Xoá tác giả thất bại !");
            }
        })
    }
}
