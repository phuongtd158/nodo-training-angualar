import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export function checkDate(effectiveDate: any, expirationDate: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const range = control as FormGroup;
        const valueStartDate = new Date(range.get(effectiveDate)?.value);
        const valueEndDate = new Date(range.get(expirationDate)?.value);

        if (valueEndDate < valueStartDate) {
            return {isCheckDate: true}
        } else {
            return null;
        }
    }

}
