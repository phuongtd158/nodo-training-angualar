import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {ToastrService} from "ngx-toastr";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReaderService {

    isCloseDialog: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );

    constructor(private readonly apiService: ApiService,
                private readonly toastService: ToastrService) {
    }

    getAllReader() {
        return this.apiService.getAllReader();
    }

    createReader(data: any) {
        return this.apiService.createReader(data).subscribe({
            next: (res) => {
                if (res.id) {
                    console.log(res);
                    this.toastService.success("Thêm bạn đọc thành công !");
                    this.isCloseDialog.next(true);
                }
            },
            error: (err) => {
                console.error(err);
                this.toastService.error("Thêm bạn đọc thất bại !");
                this.isCloseDialog.next(false);
            }
        })
    }

    updateReader(data: any, id: number) {
        return this.apiService.updateReader(data, id).subscribe({
            next: (res) => {
                console.log(res);
                this.toastService.success("Cập nhật bạn đọc thành công !");
                this.isCloseDialog.next(true);
            },
            error: (err) => {
                console.error(err);
                this.toastService.error("Cập nhật bạn đọc thất bại !");
                this.isCloseDialog.next(false);
            }
        })
    }

    deleteReader(id: number) {
        return this.apiService.deleteReader(id).subscribe({
            next: _ => {
                this.toastService.success("Xoá bạn đọc thành công !");
            },
            error: (err) => {
                console.error(err);
                this.toastService.error("Xoá bạn đọc thất bại !");
            }
        })
    }
}
