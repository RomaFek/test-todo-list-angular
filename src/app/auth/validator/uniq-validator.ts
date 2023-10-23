import {Injectable} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {catchError, map, Observable, of} from 'rxjs';
import {AuthService} from "../service/auth.service";

@Injectable({providedIn: 'root'})
export class UniqueLoginValidator {


    constructor(private authService: AuthService) {
    }

    public validateLoginUniqueness(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            const login = control.value;

            return this.authService.loginUser(login).pipe(
                map(isUnique => (!isUnique ? null : {loginNotUnique: true})),

                catchError(() => of(null))
            );
        };
    }

}
