import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModalService } from '../navbar/add-task/services/modal.service';
import { mergeMap } from 'rxjs/operators';
import { ITask } from '../shared/model/task-model';
import { environment } from '../../enviroment';

@Injectable()
export class AddCollectionInterceptor implements HttpInterceptor {
    constructor(private modalService: ModalService) {}

    public openModalError() {
        this.modalService.openModalError();
    }

    public intercept(
        request: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        if (request.url === 'addCollection') {
            const failureProbability = 0.1;
            if (Math.random() < failureProbability) {
                this.openModalError();
                return new Observable();
            } else {
                return this.addToIndexedDB(request.body).pipe(
                    mergeMap(() => next.handle(request)),
                );
            }
        }
        return next.handle(request);
    }

    private addToIndexedDB(collData: ITask): Observable<void> {
        return new Observable((observer) => {
            const openRequest = indexedDB.open(
                environment.nameDbCollections,
                environment.versionDB,
            );

            openRequest.onsuccess = function (event) {
                const db = openRequest.result;
                const transaction = db.transaction(
                    environment.nameDbCollections,
                    'readwrite',
                );
                const TodoListStore = transaction.objectStore(
                    environment.nameDbCollections,
                );
                const data = { id: Date.now(), name: collData };
                const request = TodoListStore.add(data);

                request.onsuccess = function () {
                    console.log(
                        'Коллекция успешно добавлена в хранилище',
                        request.result,
                    );
                    observer.next();
                    observer.complete();
                };

                request.onerror = function () {
                    console.error(
                        'Ошибка при добавлении коллекции',
                        request.error,
                    );
                    observer.error(request.error);
                };
            };

            openRequest.onerror = function (event) {
                console.error(
                    'Ошибка при открытии базы данных',
                    openRequest.error,
                );
                observer.error(openRequest.error);
            };
        });
    }
}
