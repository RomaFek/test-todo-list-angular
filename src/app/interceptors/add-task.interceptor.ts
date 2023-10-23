import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {ITask} from "../add-task/models/task-model";
import {ModalService} from "../add-task/services/modal.service";

@Injectable()
export class AddTaskInterceptor implements HttpInterceptor {

    constructor(private modalService: ModalService) {
    }

    public openModalError() {
        this.modalService.openModalError();
    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (request.url === 'addTask') {
            const failureProbability = 0.5;
            if (Math.random() < failureProbability) {
                this.openModalError()
            } else {
                return this.addToIndexedDB(request.body).pipe(
                    mergeMap(() => next.handle(request))
                );
            }
        }
        return next.handle(request);
    }

    private addToIndexedDB(taskData: ITask): Observable<void> {
        return new Observable<void>(observer => {
            const openRequest = indexedDB.open("store", 5);

            openRequest.onupgradeneeded = function (event) {
                const db = openRequest.result;

                if (!db.objectStoreNames.contains("TodoListStore")) {
                    db.createObjectStore("TodoListStore", {keyPath: "id"});
                }
            };

            openRequest.onsuccess = function (event) {
                const db = openRequest.result;
                const transaction = db.transaction("TodoListStore", "readwrite");
                const TodoListStore = transaction.objectStore("TodoListStore");

                const task: ITask = {
                    id: taskData.id,
                    description: taskData.description,
                    endDate: taskData.endDate,
                    collectionTask: taskData.collectionTask,
                    isCompleted: taskData.isCompleted
                };

                const request = TodoListStore.add(task);

                request.onsuccess = function () {
                    console.log("Задача успешно добавлена в хранилище", request.result);
                    observer.next();
                    observer.complete();
                };

                request.onerror = function () {
                    console.error("Ошибка при добавлении задачи", request.error);
                    observer.error(request.error);
                };
            };

            openRequest.onerror = function (event) {
                console.error("Ошибка при открытии базы данных", openRequest.error);
                observer.error(openRequest.error);
            };
        });
    }
}

