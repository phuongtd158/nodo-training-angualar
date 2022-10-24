import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Constants} from "../../../shared/Constants";
import {checkDate} from "../../../shared/validations/dateValidator";
import {OptionSetService} from "../../../shared/services/option-set.service";
import {OptionSetValueService} from "../../../shared/services/option-set-value.service";

@Component({
    selector: 'app-option-set-value-form',
    templateUrl: './option-set-value-form.component.html',
    styleUrls: ['./option-set-value-form.component.scss']
})
export class OptionSetValueFormComponent implements OnInit {

    title: string = '';
    optionSet: any = [];
    idOptionSetValue: number = -1;

    optionSetValueForm = this.fb.group({
        id: [''],
        optionSet: this.fb.group({
            id: ['']
        }),
        code: ['', [Validators.required]],
        name: ['', [Validators.required]],
        group: ['', [Validators.required]],
        effectiveDate: [new Date(), [Validators.required]],
        expirationDate: [new Date(), [Validators.required]],
        status: [1],
    }, {
        validators: checkDate('effectiveDate', 'expirationDate')
    })

    constructor(private readonly fb: FormBuilder,
                private readonly dialogRef: MatDialogRef<OptionSetValueFormComponent>,
                private readonly optionSetService: OptionSetService,
                private readonly optionSetValueService: OptionSetValueService,
                @Inject(MAT_DIALOG_DATA) public dataDialog: any
    ) {
    }

    ngOnInit(): void {
        this.getAllOptionSet();
        if (this.dataDialog.type === Constants.TYPE_DIALOG.NEW) {
            this.title = "Thêm mới danh mục";
        } else {
            this.title = "Cập nhật danh mục";
            this.optionSetValueForm.controls['code'].disable();
            this.optionSetValueForm.controls['optionSet'].disable();
            if (this.dataDialog.row) {
                this.idOptionSetValue = this.dataDialog.row.id;
                this.optionSetValueForm.patchValue(this.dataDialog.row);
            }
        }
    }

    getAllOptionSet() {
        this.optionSetService.getAllOptionSet().subscribe({
            next: (res) => {
                this.optionSet = res;
                console.log(res);
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

    // getOptionSet() {
    //     this.optionSetService.getOptionSet(this.dataDialog.idOptionSet).subscribe({
    //         next: (res) => {
    //             this.optionSet.push(res);
    //             console.log(res);
    //         },
    //         error: (err) => {
    //             console.log(err);
    //         }
    //     })
    // }

    onDismiss() {
        this.dialogRef.close(Constants.RESULT_CLOSE_DIALOG.CLOSE);
    }

    save() {
        this.optionSetValueForm.markAllAsTouched();
        if (this.optionSetValueForm.invalid) return;

        if (this.dataDialog.type === Constants.TYPE_DIALOG.NEW) {
            this.optionSetValueService.createOptionSetValue(this.optionSetValueForm.getRawValue());
        } else {
            this.optionSetValueService.updateOptionSetValue(this.idOptionSetValue, this.optionSetValueForm.getRawValue());
        }

        this.optionSetValueService.isCloseDialog.subscribe(value => {
            if (value) {
                this.dialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
                this.optionSetValueService.isCloseDialog.next(false);
            }
        })
    }

}
