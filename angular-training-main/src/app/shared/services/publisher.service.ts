import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {ToastrService} from "ngx-toastr";
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PublisherService {

    isCloseDialog: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );

    constructor(private readonly apiService: ApiService,
                private readonly toastService: ToastrService) {
    }

    getAllPublisher() {
        return this.apiService.getAllPublisher();
    }

    createPublisher(data: any) {
        return this.apiService.createPublisher(data).subscribe({
            next: (res) => {
                if (res.id) {
                    console.log(res);
                    this.toastService.success("Thêm nhà xuất bản thành công !");
                    this.isCloseDialog.next(true);
                }
            },
            error: (err) => {
                console.error(err);
                this.toastService.error("Thêm nhà xuất bản thất bại !");
                this.isCloseDialog.next(false);
            }
        })
    }

    updatePublisher(data: any, id: number) {
        return this.apiService.updatePublisher(data, id).subscribe({
            next: (res) => {
                console.log(res);
                this.toastService.success("Cập nhật nhà xuất bản thành công !");
                this.isCloseDialog.next(true);
            },
            error: (err) => {
                console.error(err);
                this.toastService.error("Cập nhật nhà xuất bản thất bại !");
                this.isCloseDialog.next(false);
            }
        })
    }

    deletePublisher(id: number) {
        return this.apiService.deletePublisher(id).subscribe({
            next: _ => {
                this.toastService.success("Xoá nhà xuất bản thành công !");
            },
            error: (err) => {
                console.error(err);
                this.toastService.error("Xoá nhà xuất bản thất bại !");
            }
        })
    }
}
