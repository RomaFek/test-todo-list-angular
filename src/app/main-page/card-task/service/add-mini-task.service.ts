import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import {IMiniTask} from '../../mini-task/models/mini-task-model';
import { map } from 'rxjs/operators';
import { IndexedDBService } from '../../../service/indexed-db.service';
import { ITask } from '../../../add-task/models/task-model';

@Injectable({
    providedIn: 'root',
})
export class AddMiniTaskService {
    private miniTasksSubject: BehaviorSubject<ITask[]> = new BehaviorSubject<
        ITask[]
    >([]);
    private miniTaskSubject$: Observable<ITask[]> =
        this.miniTasksSubject.asObservable();

    constructor(
        private http: HttpClient,
        private indexedDBService: IndexedDBService,
    ) {
        this.getMiniTasks();
    }

    public setNewMiniTask(miniTask: ITask): Observable<ITask> {
        const currentMiniTasks = this.miniTasksSubject.value;
        const updatedMiniTasks = [...currentMiniTasks, miniTask];
        this.miniTasksSubject.next(updatedMiniTasks);
        return this.http.post<ITask>('addTask', miniTask);
    }

    public get allMiniTasks(): Observable<ITask[]> {
        return this.miniTaskSubject$;
    }

    private getMiniTasks() {
        this.indexedDBService
            .initDBTasks()
            .pipe(map((tasks: ITask[]) => tasks))
            .subscribe((tasks: ITask[]) => {
                this.miniTasksSubject.next(tasks);
            });
    }

    // private getAllMiniTask(): Observable<IMiniTask[]> {
    //     return
    // new Observable<IMiniTask[]>((observer) => {
    //     const openRequest = indexedDB.open('miniTaskStore', 5);
    //
    //     openRequest.onupgradeneeded = function (event) {
    //         const db = openRequest.result;
    //
    //         if (!db.objectStoreNames.contains('miniTaskStore')) {
    //             let tasks = db.createObjectStore('miniTaskStore', {keyPath: 'id'});
    //             tasks.createIndex('task_id', 'task_id');
    //             tasks.createIndex('isCompleted', 'isCompleted');
    //         }
    //     };
    //
    //     openRequest.onsuccess = function (event) {
    //         const db = openRequest.result;
    //         const transaction = db.transaction('miniTaskStore', 'readonly');
    //         const TodoListStore = transaction.objectStore('miniTaskStore');
    //
    //         const getAllRequest = TodoListStore.getAll();
    //
    //         getAllRequest.onsuccess = function () {
    //             const tasks: IMiniTask[] = getAllRequest.result || [];
    //             observer.next(tasks);
    //             observer.complete();
    //         };
    //
    //         getAllRequest.onerror = function () {
    //             observer.error('Ошибка при получении задач: ' + getAllRequest.error);
    //         };
    //     };
    //
    //     openRequest.onerror = function (event) {
    //         observer.error('Ошибка при открытии базы данных: ' + openRequest.error);
    //     };
    // }).pipe(
    //     catchError((error) => {
    //         console.error(error);
    //         return throwError(error);
    //     })
    // );

    public updateMiniTask(task: ITask): Observable<ITask[]> {
        const currentTasks = this.miniTasksSubject.value || [];

        const updatedTasks = currentTasks.map((t) => {
            if (t.id === task.id) {
                return task;
            }
            return t;
        });

        this.miniTasksSubject.next(updatedTasks);

        return this.indexedDBService.updateTask(task);
        // new Observable<IMiniTask[]>((observer) => {
        //         const openRequest = indexedDB.open('miniTaskStore', 5);
        //
        //         openRequest.onsuccess = function (event) {
        //             const db = openRequest.result;
        //             const transaction = db.transaction('miniTaskStore', 'readwrite');
        //             const miniTaskStore = transaction.objectStore('miniTaskStore');
        //
        //             if (task.id !== null) {
        //                 const getRequest = miniTaskStore.get(task.id);
        //
        //                 getRequest.onsuccess = function () {
        //                     const existingTask = getRequest.result;
        //
        //                     if (existingTask) {
        //                         existingTask.isCompleted = task.isCompleted;
        //                         const updateRequest = miniTaskStore.put(existingTask);
        //
        //                         updateRequest.onsuccess = function () {
        //                             const getAllRequest = miniTaskStore.getAll();
        //
        //                             getAllRequest.onsuccess = function () {
        //                                 const tasks: IMiniTask[] = getAllRequest.result || [];
        //                                 observer.next(tasks);
        //                                 observer.complete();
        //                             };
        //
        //                             getAllRequest.onerror = function () {
        //                                 observer.error('Ошибка при получении задач: ' + getAllRequest.error);
        //                             };
        //                         };
        //
        //                         updateRequest.onerror = function () {
        //                             observer.error('Ошибка при обновлении задачи: ' + updateRequest.error);
        //                         };
        //                     } else {
        //                         observer.error('Задача не найдена');
        //                     }
        //                 };
        //
        //                 getRequest.onerror = function () {
        //                     observer.error('Ошибка при получении задачи: ' + getRequest.error);
        //                 };
        //             } else {
        //                 observer.error('Некорректный ID задачи');
        //             }
        //         };
        //
        //         openRequest.onerror = function (event) {
        //             observer.error('Ошибка при открытии базы данных: ' + openRequest.error);
        //         };
        //     }).pipe(
        //         catchError((error) => {
        //             console.error(error);
        //             return throwError(error);
        //         })
        //     );
        // }
        //
        //
        // public getOneMiniTask(taskId: number): Observable<IMiniTask> {
        //     return new Observable<IMiniTask>((observer) => {
        //         const openRequest = indexedDB.open("miniTaskStore", 5);
        //
        //         openRequest.onsuccess = function (event) {
        //             const db = openRequest.result;
        //             const transaction = db.transaction("miniTaskStore", "readonly");
        //             const miniTaskStore = transaction.objectStore("miniTaskStore");
        //
        //             const getRequest = miniTaskStore.get(taskId);
        //
        //             getRequest.onsuccess = function () {
        //                 const task: IMiniTask = getRequest.result;
        //                 if (task) {
        //                     observer.next(task);
        //                     observer.complete();
        //                 } else {
        //                     observer.error("Задача не найдена");
        //                 }
        //             };
        //
        //             getRequest.onerror = function () {
        //                 observer.error("Ошибка при получении задачи: " + getRequest.error);
        //             };
        //         };
        //
        //         openRequest.onerror = function (event) {
        //             observer.error("Ошибка при открытии базы данных: " + openRequest.error);
        //         };
        //     }).pipe(
        //         catchError((error) => {
        //             console.error(error);
        //             return throwError(error);
        //         }))
        //
        // }
    }
}
