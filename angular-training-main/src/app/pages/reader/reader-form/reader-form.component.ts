import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ReaderService} from "../../../shared/services/reader.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Constants} from "../../../shared/Constants";

@Component({
    selector: 'app-reader-form',
    templateUrl: './reader-form.component.html',
    styleUrls: ['./reader-form.component.scss']
})
export class ReaderFormComponent implements OnInit {

    title: string = '';

    readerForm = this.fb.group({
        id: '',
        maBanDoc: [''],
        tenBanDoc: ['', [Validators.required]],
        sdt: ['', [Validators.required]],
        ngaySinh: ['', [Validators.required]],
        ngayTaoTaiKhoan: [new Date()],
        diaChi: ['', [Validators.required]],
        hang: ['', [Validators.required]],
    })

    constructor(private readonly fb: FormBuilder,
                private readonly readerService: ReaderService,
                private readonly dialogRef: MatDialogRef<ReaderFormComponent>,
                @Inject(MAT_DIALOG_DATA) public dataDialog: any) {
    }

    ngOnInit(): void {
        if (this.dataDialog.type === Constants.TYPE_DIALOG.NEW) {
            this.title = 'Thêm mới bạn đọc';
        } else {
            this.title = 'Cập nhật bạn đọc';
            this.readerForm.controls['maBanDoc'].disable();
            this.readerForm.patchValue(this.dataDialog.row);
        }
    }

    onDismiss() {
        this.dialogRef.close(Constants.RESULT_CLOSE_DIALOG.CLOSE);
    }

    save() {
        this.readerForm.markAllAsTouched();
        if (this.readerForm.invalid) {
            return;
        }

        if (this.dataDialog.type === Constants.TYPE_DIALOG.NEW) {
            this.readerService.createReader(this.readerForm.getRawValue());
        } else {
            this.readerService.updateReader(this.readerForm.getRawValue(), this.dataDialog.row.id);
        }
        this.readerService.isCloseDialog.subscribe(value => {
            console.log(value)
            if (value) {
                console.log(value);
                this.dialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
                this.readerService.isCloseDialog.next(false);
            }
        })
    }
}
