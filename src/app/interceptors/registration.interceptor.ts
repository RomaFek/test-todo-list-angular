import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../shared/model/user-model';
import { ModalService } from '../navbar/services/modal.service';
import { mergeMap } from 'rxjs/operators';
import { environment } from '../../enviroment';

@Injectable()
export class RegistrationInterceptor implements HttpInterceptor {
    constructor(private modalService: ModalService) {}

    public openModalError() {
        this.modalService.openModalError();
    }

    public intercept(
        request: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        if (request.url === 'addUser') {
            const failureProbability = 0.1;
            if (Math.random() < failureProbability) {
                // sessionStorage.setItem('authenticated', 'false');
                this.openModalError();
            } else {
                sessionStorage.setItem('authenticated', 'true');
                return this.addToIndexedDB(request.body).pipe(
                    mergeMap(() => next.handle(request)),
                );
            }
        }
        return next.handle(request);
    }

    private addToIndexedDB(userData: IUser): Observable<void> {
        return new Observable<void>((observer) => {
            const openRequest = indexedDB.open(
                environment.nameDbUsers,
                environment.versionDB,
            );

            openRequest.onupgradeneeded = function (event) {
                const db = openRequest.result;
                if (!db.objectStoreNames.contains(environment.nameDbUsers)) {
                    let users = db.createObjectStore(environment.nameDbUsers, {
                        keyPath: 'id',
                    });

                    users.createIndex('login_idx', 'login');
                }
            };

            openRequest.onsuccess = function (event) {
                const db = openRequest.result;
                const transaction = db.transaction(
                    environment.nameDbUsers,
                    'readwrite',
                );
                const TodoListStore = transaction.objectStore(
                    environment.nameDbUsers,
                );

                const user: IUser = {
                    id: userData.id,
                    username: userData.username,
                    login: userData.login,
                    password: userData.password,
                };

                const request = TodoListStore.add(user);

                request.onsuccess = function () {
                    sessionStorage.setItem(
                        'authenticatedUser',
                        JSON.stringify(user.username),
                    );
                    console.log(
                        'Пользователь успешно добавлен в хранилище',
                        request.result,
                    );
                };

                request.onerror = function () {
                    console.error(
                        'Ошибка при добавлении пользователя',
                        request.error,
                    );
                };
            };

            openRequest.onerror = function (event) {
                console.error(
                    'Ошибка при открытии базы данных',
                    openRequest.error,
                );
            };
        });
    }
}
