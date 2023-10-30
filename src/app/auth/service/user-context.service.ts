import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserContextService {
    private authenticatedUserSubject: BehaviorSubject<string> =
        new BehaviorSubject<string>('');

    constructor() {}

    public get getUserName$(): Observable<string> {
        this.getAuthenticatedUser();
        this.authenticatedUserSubject
            .pipe(take(1))
            .subscribe((user: string) => {
                this.authenticatedUserSubject.next(user);
            });

        return this.authenticatedUserSubject.asObservable();
    }

    public setAuthenticatedUser(user: string): void {
        sessionStorage.setItem('authenticatedUser', JSON.stringify(user));
        this.authenticatedUserSubject.next(user);
    }

    public getAuthenticatedUser(): void {
        let user = sessionStorage.getItem('authenticatedUser');
        if (user) {
            user = JSON.parse(user);
            if (user) {
                this.authenticatedUserSubject.next(user);
            }
        }
    }
}
