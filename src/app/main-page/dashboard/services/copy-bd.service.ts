import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask } from '../../../add-task/models/task-model';
// import {OperationTaskService} from "./operation-task.service";
import { HttpClient } from '@angular/common/http';
import { IndexedDBService } from '../../../service/indexed-db.service';

@Injectable({
    providedIn: 'root',
})
export class CopyBDService {
    // allTaskSubject$: BehaviorSubject<ITask[]> = new BehaviorSubject<ITask[]>(
    //     [],
    // );

    // private notCompletedTaskSubject$: BehaviorSubject<ITask[]> = new BehaviorSubject<ITask[]>([]);

    constructor(
        // private operationTaskService: OperationTaskService,
        private indexedDB: IndexedDBService,
        private http: HttpClient,
    ) {
        // this.getTasks();
        // this.getNotCompletedTasks()
    }

    // public get allTasks(): BehaviorSubject<ITask[]> {
    //     return this.allTaskSubject$;
    // }

    // public getTasks() {
    //     if (this.allTaskSubject$.value.length > 0) {
    //         this.indexedDB
    //             .initDBTasks()
    //             .pipe(
    //                 tap((v) => console.log(v, '----')),
    //                 take(1),
    //             )
    //             .subscribe((tasks: ITask[]) => {
    //                 this.allTaskSubject$.next(tasks);
    //             });
    //     }
    // }

    public addTasks(taskData: ITask) {
        // const currentTasks = this.allTaskSubject$.getValue();
        // this.allTaskSubject$.next([...currentTasks, taskData]);
        return this.http.post('addTask', taskData);
    }

    // public updateTask(task: ITask): Observable<ITask[]> {
    //     const currentTasks = this.allTaskSubject$.getValue();
    //     const updatedTasks = currentTasks.map((taskInArr) => {
    //         if (taskInArr.id === task.id) {
    //             return task;
    //         }
    //         return taskInArr;
    //     });
    //     this.allTaskSubject$.next(updatedTasks);
    //     return this.indexedDB.updateTask(task);
    // new Observable<ITask[]>((observer) => {
    //     const openRequest = indexedDB.open('store', 5);
    //     openRequest.onsuccess = function (event) {
    //         const db = openRequest.result;
    //         const transaction = db.transaction(
    //             'TodoListStore',
    //             'readwrite',
    //         );
    //         const TodoListStore = transaction.objectStore('TodoListStore');
    //
    //         if (task.id !== null) {
    //             const getRequest = TodoListStore.get(task.id);
    //
    //             getRequest.onsuccess = function () {
    //                 const existingTask = getRequest.result;
    //
    //                 if (existingTask) {
    //                     existingTask.isCompleted = task.isCompleted;
    //                     existingTask.collectionTask = task.collectionTask;
    //                     const updateRequest =
    //                         TodoListStore.put(existingTask);
    //                     updateRequest.onsuccess = function () {
    //                         const getAllRequest = TodoListStore.getAll();
    //
    //                         getAllRequest.onsuccess = function () {
    //                             const tasks: ITask[] = getAllRequest.result;
    //                             observer.next(tasks);
    //                             observer.complete();
    //                         };
    //
    //                         getAllRequest.onerror = function () {
    //                             observer.error(
    //                                 'Ошибка при получении задач: ' +
    //                                     getAllRequest.error,
    //                             );
    //                         };
    //                     };
    //
    //                     updateRequest.onerror = function () {
    //                         observer.error(
    //                             'Ошибка при обновлении задачи: ' +
    //                                 updateRequest.error,
    //                         );
    //                     };
    //                 } else {
    //                     observer.error('Задача не найдена');
    //                 }
    //             };
    //
    //             getRequest.onerror = function () {
    //                 observer.error(
    //                     'Ошибка при получении задачи: ' + getRequest.error,
    //                 );
    //             };
    //         } else {
    //             observer.error('Некорректный ID задачи');
    //         }
    //     };
    //
    //     openRequest.onerror = function (event) {
    //         observer.error(
    //             'Ошибка при открытии базы данных: ' + openRequest.error,
    //         );
    //     };
    // }).pipe(
    //     catchError((error) => {
    //         console.error(error);
    //         return throwError(error);
    //     }),
    // );
    // }

    public getOneTask(taskId: number): Observable<ITask> {
        return this.indexedDB.getOneTask(taskId);
        // new Observable<ITask>((observer) => {
        //     const openRequest = indexedDB.open('store', 5);
        //
        //     openRequest.onsuccess = function (event) {
        //         const db = openRequest.result;
        //         const transaction = db.transaction('TodoListStore', 'readonly');
        //         const TodoListStore = transaction.objectStore('TodoListStore');
        //
        //         const getRequest = TodoListStore.get(taskId);
        //
        //         getRequest.onsuccess = function () {
        //             const task: ITask = getRequest.result;
        //             if (task) {
        //                 observer.next(task);
        //                 observer.complete();
        //             } else {
        //                 observer.error('Задача не найдена');
        //             }
        //         };
        //
        //         getRequest.onerror = function () {
        //             observer.error(
        //                 'Ошибка при получении задачи: ' + getRequest.error,
        //             );
        //         };
        //     };
        //
        //     openRequest.onerror = function (event) {
        //         observer.error(
        //             'Ошибка при открытии базы данных: ' + openRequest.error,
        //         );
        //     };
        // }).pipe(
        //     catchError((error) => {
        //         console.error(error);
        //         return throwError(error);
        //     }),
        // );
    }
}
