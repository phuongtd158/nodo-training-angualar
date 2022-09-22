import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthorService} from "../../../shared/services/author.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Constants} from "../../../shared/Constants";

@Component({
    selector: 'app-author-form',
    templateUrl: './author-form.component.html',
    styleUrls: ['./author-form.component.scss']
})
export class AuthorFormComponent implements OnInit {

    title: string = '';

    authorForm = this.fb.group({
        id: '',
        maTacGia: [''],
        tenTacGia: ['', [Validators.required]],
        sdt: ['', [Validators.required, Validators.pattern(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/)]],
        diachi: ['', [Validators.required]],
        mota: ['', []]
    })

    constructor(private readonly fb: FormBuilder,
                private readonly authorService: AuthorService,
                private readonly dialogRef: MatDialogRef<AuthorFormComponent>,
                @Inject(MAT_DIALOG_DATA) public dataDialog: any) {
    }

    ngOnInit(): void {
        if (this.dataDialog.type === Constants.TYPE_DIALOG.NEW) {
            this.title = 'Thêm mới tác giả';
        } else {
            this.title = 'Cập nhật tác giả'
            if (this.dataDialog.row) {
                this.authorForm.controls['maTacGia'].disable();
                this.authorForm.patchValue(this.dataDialog.row);
            }
        }

    }

    onDismiss() {
        this.dialogRef.close(Constants.RESULT_CLOSE_DIALOG.CLOSE);
    }

    save() {
        this.authorForm.markAllAsTouched();
        if (this.authorForm.invalid) {
            return;
        }
        if (this.dataDialog.type === Constants.TYPE_DIALOG.NEW) {
            this.authorService.createAuthor(this.authorForm.getRawValue());
        } else {
            this.authorService.updateAuthor(this.authorForm.getRawValue(), this.dataDialog.row.id);
        }
        this.authorService.isCloseDialog.subscribe(value => {
            console.log(value)
            if (value) {
                console.log(value);
                this.dialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
                this.authorService.isCloseDialog.next(false);
            }
        })
    }
}
