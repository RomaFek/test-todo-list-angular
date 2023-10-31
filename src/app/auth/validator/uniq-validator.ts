import { Injectable } from '@angular/core';
import {
    AbstractControl,
    AsyncValidatorFn,
    ValidationErrors,
} from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';

import { IndexedDBService } from '../../shared/service/indexed-db.service';

@Injectable({ providedIn: 'root' })
export class UniqueLoginValidator {
    constructor(private indexedDBService: IndexedDBService) {}

    public validateLoginUniqueness(): AsyncValidatorFn {
        return (
            control: AbstractControl,
        ): Observable<ValidationErrors | null> => {
            const login = control.value;
            return (
                this.indexedDBService.loginUser(login)?.pipe(
                    map((isUnique) =>
                        !isUnique ? null : { loginNotUnique: true },
                    ),
                    catchError(() => of(null)),
                ) ?? of(null)
            );
        };
    }
}
