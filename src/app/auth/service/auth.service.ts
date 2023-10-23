import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, Observable, take, tap, throwError} from "rxjs";
import {IUser} from "../model/user-model";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private allUserSubject$: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);

    public get allUsers(): BehaviorSubject<IUser[]> {
        return this.allUserSubject$;
    }

    constructor(private http: HttpClient) {
    }

    public registration(user: IUser) {
        const currentUsers = this.allUserSubject$.getValue();
        this.allUserSubject$.next([...currentUsers, user]);
        return this.http.post('addUser', user)
    }

    private getUsers() {
        if (!!this.allUserSubject$.value) {
            this.getAllUser().pipe(
                take(1)).subscribe(
                (users: IUser[]) => {
                    this.allUserSubject$.next(users);
                }
            );
        }
    }


    private getAllUser() {
        return new Observable<IUser[]>((observer) => {
            const openRequest = indexedDB.open("usersMain", 5);

            openRequest.onupgradeneeded = function (event) {
                const db = openRequest.result;

                if (!db.objectStoreNames.contains("UserList")) {
                    let users = db.createObjectStore("UserList", {keyPath: "id"});
                    let index = users.createIndex('login_idx', 'login');
                }
            };

            openRequest.onsuccess = function (event) {
                const db = openRequest.result;
                const transaction = db.transaction("UserList", "readonly");
                const CollectList = transaction.objectStore("UserList");

                const getAllRequest = CollectList.getAll();

                getAllRequest.onsuccess = function () {
                    const user: IUser[] = getAllRequest.result;
                    observer.next(user);
                    observer.complete();
                };

                getAllRequest.onerror = function () {
                    observer.error("Ошибка при получении пользователя: " + getAllRequest.error);
                };
            };

            openRequest.onerror = function (event) {
                observer.error("Ошибка при открытии базы данных: " + openRequest.error);
            };
        }).pipe(
            catchError(error => {
                console.error(error);
                return throwError(error);
            })
        );
    }

    public loginUser(userLogin: string): Observable<IUser> {
        return new Observable<IUser>((observer) => {
            const openRequest = indexedDB.open("usersMain", 5);

            openRequest.onsuccess = (event) => {
                const db = openRequest.result;
                const transaction = db.transaction("UserList", "readonly");
                const CollectList = transaction.objectStore("UserList");
                const myIndex = CollectList.index("login_idx");
                const getRequest = myIndex.get(userLogin);

                getRequest.onsuccess = () => {
                    const user: IUser = getRequest.result;
                    observer.next(user);
                    observer.complete();
                };

                getRequest.onerror = () => {
                    const errorMessage = "Ошибка при получении пользователя: " + getRequest.error;
                    observer.error(errorMessage);
                };
            };

            openRequest.onerror = (event) => {
                const errorMessage = "Ошибка при открытии базы данных: " + openRequest.error;
                observer.error(errorMessage);
            };
        }).pipe(
            catchError(error => {
                console.error(error);
                return throwError(error);
            }),
            tap(user => {
                if (user) {
                    sessionStorage.setItem('authenticatedUser', JSON.stringify(user.username));
                }
            })
        );
    }
}
