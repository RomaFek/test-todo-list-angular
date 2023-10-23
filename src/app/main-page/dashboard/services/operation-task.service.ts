import {Injectable} from '@angular/core';
import {ITask} from "../../../add-task/models/task-model";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class OperationTaskService {


    public getAllTask(): Observable<ITask[]> {

        return new Observable<ITask[]>((observer) => {
            const openRequest = indexedDB.open("store", 5);

            openRequest.onupgradeneeded = function (event) {
                const db = openRequest.result;

                if (!db.objectStoreNames.contains("TodoListStore")) {
                    let tasks = db.createObjectStore("TodoListStore", {keyPath: "id"});
                    tasks.createIndex('collectionTask_idx', 'collectionTask');
                }
            };

            openRequest.onsuccess = function (event) {
                const db = openRequest.result;
                const transaction = db.transaction("TodoListStore", "readonly");
                const TodoListStore = transaction.objectStore("TodoListStore");

                const getAllRequest = TodoListStore.getAll();

                getAllRequest.onsuccess = function () {
                    const tasks: ITask[] = getAllRequest.result;
                    observer.next(tasks);
                    observer.complete();
                };

                getAllRequest.onerror = function () {
                    observer.error("Ошибка при получении задач: " + getAllRequest.error);
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
}
