import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Constants} from "../../../shared/Constants";
import {PublisherService} from "../../../shared/services/publisher.service";

@Component({
    selector: 'app-publisher-form',
    templateUrl: './publisher-form.component.html',
    styleUrls: ['./publisher-form.component.scss']
})
export class PublisherFormComponent implements OnInit {

    title: string = '';

    publisherForm = this.fb.group({
        id: '',
        maNxb: [''],
        tenNxb: ['', [Validators.required]],
        trangThai: [1, [Validators.required]],
        diaChi: ['', [Validators.required]],
        moTa: ['', []]
    })

    constructor(private readonly fb: FormBuilder,
                private readonly publisherService: PublisherService,
                private readonly dialogRef: MatDialogRef<PublisherFormComponent>,
                @Inject(MAT_DIALOG_DATA) public dataDialog: any) {
    }

    ngOnInit(): void {
        if (this.dataDialog.type === Constants.TYPE_DIALOG.NEW) {
            this.title = 'Thêm mới nhà xuất bản';
        } else {
            this.title = 'Cập nhật nhà xuất bản'
            if (this.dataDialog.row) {
                this.publisherForm.controls['maNxb'].disable();
                this.publisherForm.patchValue(this.dataDialog.row);
            }
        }

    }

    onDismiss() {
        this.dialogRef.close(Constants.RESULT_CLOSE_DIALOG.CLOSE);
    }

    save() {
        this.publisherForm.markAllAsTouched();
        if (this.publisherForm.invalid) {
            return;
        }
        if (this.dataDialog.type === Constants.TYPE_DIALOG.NEW) {
            this.publisherService.createPublisher(this.publisherForm.getRawValue());
        } else {
            this.publisherService.updatePublisher(this.publisherForm.getRawValue(), this.dataDialog.row.id);
        }
        this.publisherService.isCloseDialog.subscribe(value => {
            console.log(value)
            if (value) {
                console.log(value);
                this.dialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
                this.publisherService.isCloseDialog.next(false);
            }
        })
    }

}
