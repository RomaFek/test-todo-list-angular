import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserContextService {
    private authenticatedUserSubject: BehaviorSubject<string> =
        new BehaviorSubject<string>('');
    public authenticatedUser$ = this.authenticatedUserSubject.asObservable();

    constructor() {
        this.getAuthenticatedUser();
    }

    private getAuthenticatedUser() {
        let user = sessionStorage.getItem('authenticatedUser');
        if (user) {
            user = JSON.parse(user);
            if (user) {
                this.authenticatedUserSubject.next(user);
            }
        }
    }
}
