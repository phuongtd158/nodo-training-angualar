import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {BehaviorSubject, Observable} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})
export class OptionSetService {

    isCloseDialog: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private readonly apiService: ApiService,
                private readonly toastService: ToastrService) {
    }

    getOptionSet(id: number) {
        return this.apiService.getOptionSet(id);
    }

    getAllOptionSet() {
        return this.apiService.getAllOptionSet();
    }

    createOptionSet(data: any) {
        return this.apiService.createOptionSet(data).subscribe({
            next: (res) => {
                console.log(res);
                this.toastService.success("Thêm mới loại danh mục thành công !")
                this.isCloseDialog.next(true);
            },
            error: (err) => {
                console.log(err);
                if (err.error.code === "UNIQUE") {
                    this.toastService.error("Mã loại danh mục đã tồn tại !")
                }
                this.toastService.error("Thêm mới loại danh mục thất bại !")
                this.isCloseDialog.next(false);
            }
        });
    }

    updateOptionSet(id: number, data: any) {
        return this.apiService.updateOptionSet(id, data).subscribe({
            next: (res) => {
                console.log(res);
                this.toastService.success("Cập nhật loại danh mục thành công !")
                this.isCloseDialog.next(true);
            },
            error: (err) => {
                console.log(err);
                this.toastService.error("Cập nhật loại danh mục thất bại !")
                this.isCloseDialog.next(false);
            }
        })
    }

    searchOptionSet(param: any) {
        return this.apiService.searchOptionSet(param);
    }


}
