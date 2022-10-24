import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {BehaviorSubject} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})
export class OptionSetValueService {

    isCloseDialog: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private readonly apiService: ApiService,
                private readonly toastService: ToastrService) {
    }

    searchOptionSetValue(param: any) {
        return this.apiService.searchOptionSetValue(param);
    }

    getAllOptionSetValueById(id: number) {
        return this.apiService.getAllOptionSetValueById(id);
    }

    createOptionSetValue(data: any) {
        return this.apiService.createOptionSetValue(data).subscribe({
            next: (res) => {
                console.log(res);
                this.toastService.success("Thêm mới danh mục thành công !")
                this.isCloseDialog.next(true);
            },
            error: (err) => {
                console.log(err);
                if (err.error.code === "UNIQUE") {
                    this.toastService.error("Mã danh mục đã tồn tại !")
                }
                this.toastService.error("Thêm mới danh mục thất bại !")
                this.isCloseDialog.next(false);
            }
        });
    }

    updateOptionSetValue(id: number, data: any) {
        return this.apiService.updateOptionSetValue(id, data).subscribe({
            next: (res) => {
                console.log(res);
                this.toastService.success("Cập nhật danh mục thành công !")
                this.isCloseDialog.next(true);
            },
            error: (err) => {
                console.log(err);
                this.toastService.error("Cập nhật danh mục thất bại !")
                this.isCloseDialog.next(false);
            }
        })
    }
}
