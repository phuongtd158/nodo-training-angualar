import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Constants} from "../../../shared/Constants";
import {checkDate} from "../../../shared/validations/dateValidator";
import {OptionSetService} from "../../../shared/services/option-set.service";

@Component({
    selector: 'app-option-set-form',
    templateUrl: './option-set-form.component.html',
    styleUrls: ['./option-set-form.component.scss']
})
export class OptionSetFormComponent implements OnInit {

    title: string = '';
    optionSetId: any;


    optionSetForm = this.fb.group({
        id: [''],
        code: ['', [Validators.required]],
        name: ['', [Validators.required]],
        effectiveDate: [new Date(), [Validators.required]],
        expirationDate: [new Date(), [Validators.required]],
        status: [1],
    }, {
        validators: checkDate('effectiveDate', 'expirationDate')
    })

    constructor(private readonly fb: FormBuilder,
                private readonly dialogRef: MatDialogRef<OptionSetFormComponent>,
                private readonly optionSetService: OptionSetService,
                @Inject(MAT_DIALOG_DATA) public dataDialog: any) {
    }

    ngOnInit(): void {
        if (this.dataDialog.type === Constants.TYPE_DIALOG.NEW) {
            this.title = "Thêm mới loại danh mục";
        } else {
            this.title = "Cập nhật loại danh mục";
            if (this.dataDialog.row) {
                this.optionSetForm.controls['code'].disable();
                this.optionSetForm.patchValue(this.dataDialog.row);
                this.optionSetId = this.dataDialog.row.id;
            }
        }
    }

    onDismiss() {
        this.dialogRef.close(Constants.RESULT_CLOSE_DIALOG.CLOSE);
    }

    save() {
        this.optionSetForm.markAllAsTouched();
        if (this.optionSetForm.invalid) return;

        this.optionSetForm.getRawValue().code = this.optionSetForm.getRawValue().code.toUpperCase();
        if (this.dataDialog.type === Constants.TYPE_DIALOG.NEW) {
            this.optionSetService.createOptionSet(this.optionSetForm.getRawValue());
        } else {
            this.optionSetService.updateOptionSet(this.optionSetId, this.optionSetForm.getRawValue());
        }

        this.optionSetService.isCloseDialog.subscribe(value => {
            if (value) {
                this.dialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
                this.optionSetService.isCloseDialog.next(false);
            }
        })
    }
}
