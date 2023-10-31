import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ITask } from '../shared/model/task-model';
import { ModalService } from '../navbar/services/modal.service';
import { environment } from '../../enviroment';

@Injectable()
export class AddTaskInterceptor implements HttpInterceptor {
    constructor(private modalService: ModalService) {}

    public openModalError() {
        this.modalService.openModalError();
    }

    public intercept(
        request: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        if (request.url === 'addTask') {
            const failureProbability = 0.1;
            if (Math.random() < failureProbability) {
                this.openModalError();
            } else {
                return this.addToIndexedDB(request.body).pipe(
                    mergeMap(() => next.handle(request)),
                );
            }
        }
        return next.handle(request);
    }

    private addToIndexedDB(taskData: ITask): Observable<void> {
        return new Observable<void>((observer) => {
            const openRequest = indexedDB.open(
                environment.nameDbTasks,
                environment.versionDB,
            );

            openRequest.onupgradeneeded = function (event) {
                const db = openRequest.result;

                if (!db.objectStoreNames.contains(environment.nameDbTasks)) {
                    db.createObjectStore(environment.nameDbTasks, {
                        keyPath: 'id',
                    });
                }
            };

            openRequest.onsuccess = function (event) {
                const db = openRequest.result;
                const transaction = db.transaction(
                    environment.nameDbTasks,
                    'readwrite',
                );
                const TodoListStore = transaction.objectStore(
                    environment.nameDbTasks,
                );

                const task: ITask = {
                    id: taskData.id,
                    description: taskData.description,
                    endDate: taskData.endDate,
                    collectionTask: taskData.collectionTask,
                    isCompleted: taskData.isCompleted,
                    task_id: taskData.task_id,
                };

                const request = TodoListStore.add(task);

                request.onsuccess = function () {
                    console.log(
                        'Задача успешно добавлена в хранилище',
                        request.result,
                    );
                    observer.next();
                    observer.complete();
                };

                request.onerror = function () {
                    console.error(
                        'Ошибка при добавлении задачи',
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
