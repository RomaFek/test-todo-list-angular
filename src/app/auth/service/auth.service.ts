import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { IUser } from '../model/user-model';
import { HttpClient } from '@angular/common/http';
import { IndexedDBService } from '../../service/indexed-db.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private allUserSubject$: BehaviorSubject<IUser[]> = new BehaviorSubject<
        IUser[]
    >([]);

    public get allUsers(): BehaviorSubject<IUser[]> {
        return this.allUserSubject$;
    }

    constructor(
        private http: HttpClient,
        private indexedDBService: IndexedDBService,
    ) {}

    public registration(user: IUser) {
        const currentUsers = this.allUserSubject$.getValue();
        this.allUserSubject$.next([...currentUsers, user]);
        return this.http.post('addUser', user);
    }

    private getUsers() {
        if (!!this.allUserSubject$.value) {
            this.indexedDBService
                .initDBUsers()
                .pipe(take(1))
                .subscribe((users: IUser[]) => {
                    this.allUserSubject$.next(users);
                });
        }
    }
}
