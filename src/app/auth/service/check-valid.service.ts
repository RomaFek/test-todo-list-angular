import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class CheckValidService {
    constructor() {}

    public getErrorMessage(submitted: boolean, control: FormControl): string {
        if (submitted && control.hasError('minlength')) {
            return 'Must be at least 3 characters long.';
        }
        if (submitted && control.hasError('required')) {
            return 'This field is required';
        }
        if (submitted && control.hasError('loginNotUnique')) {
            return 'This login is not unique.';
        }
        return '';
    }
}
