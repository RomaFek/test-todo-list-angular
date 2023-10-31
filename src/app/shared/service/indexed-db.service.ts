import { Injectable } from '@angular/core';
import {
    BehaviorSubject,
    catchError,
    Observable,
    take,
    tap,
    throwError,
} from 'rxjs';
import { ITask } from '../model/task-model';
import { IUser } from '../model/user-model';
import { ICollection } from '../model/collection';
import { environment } from '../../../enviroment';
import { HttpClient } from '@angular/common/http';
import { initialValue } from '../model/initialValue-model';
import { UserContextService } from '../../auth/service/user-context.service';

@Injectable({
    providedIn: 'root',
})
export class IndexedDBService {
    private allTaskSubject: BehaviorSubject<ITask[]> = new BehaviorSubject<
        ITask[]
    >([]);

    private collectionSubject: BehaviorSubject<ICollection[]> =
        new BehaviorSubject<ICollection[]>(initialValue);

    constructor(
        private http: HttpClient,
        private userContextService: UserContextService,
    ) {}

    private getCollections(): Observable<ICollection[]> {
        return this.initDBCollections();
    }

    private getTasks() {
        return this.initDBTasks();
    }

    public get allCollections(): Observable<ICollection[]> {
        this.getCollections()
            .pipe(take(1))
            .subscribe((col: ICollection[]) => {
                let newValue = [...col, ...initialValue];
                this.collectionSubject.next(newValue);
            });

        return this.collectionSubject.asObservable();
    }

    public get allTasks(): Observable<ITask[]> {
        if (this.allTaskSubject.value.length === 0) {
            this.getTasks()
                .pipe(take(1))
                .subscribe((tasks: ITask[]) => {
                    this.allTaskSubject.next(tasks);
                });
        }
        return this.allTaskSubject.asObservable();
    }

    public addNewCollect(nameCollection: string) {
        const newCollection = { id: Date.now(), name: nameCollection };
        const currentCollection = [
            ...this.collectionSubject.getValue(),
            newCollection,
        ];
        this.collectionSubject.next(currentCollection);
        return this.http.post('addCollection', nameCollection);
    }

    public addTasks(taskData: ITask) {
        const currentTasks = this.allTaskSubject.getValue();
        this.allTaskSubject.next([...currentTasks, taskData]);
        return this.http.post('addTask', taskData);
    }

    private openRequestOnSuccess(req: IDBOpenDBRequest, namingDb: string) {
        return new Observable<any>((observer) => {
            req.onsuccess = function (event) {
                const db = req.result;
                const transaction = db.transaction(namingDb, 'readonly');
                const store = transaction.objectStore(namingDb);

                const getAllRequest = store.getAll();

                getAllRequest.onsuccess = function () {
                    const res = getAllRequest.result;
                    observer.next(res);
                    observer.complete();
                };

                getAllRequest.onerror = function () {
                    observer.error(
                        'Ошибка при получении задач: ' + getAllRequest.error,
                    );
                };
            };
        });
    }

    public initDBTasks() {
        const openRequest = indexedDB.open(
            environment.nameDbTasks,
            environment.versionDB,
        );
        const namingDb = environment.nameDbTasks;
        return new Observable<ITask[]>((observer) => {
            openRequest.onupgradeneeded = function (event) {
                const db = openRequest.result;

                if (!db.objectStoreNames.contains(namingDb)) {
                    let tasks = db.createObjectStore(namingDb, {
                        keyPath: 'id',
                    });
                    tasks.createIndex('collectionTask', 'collectionTask');
                }
            };
            this.openRequestOnSuccess(openRequest, namingDb).subscribe(
                (tasks: ITask[]) => {
                    observer.next(tasks);
                    observer.complete();
                },
            );
        });
    }

    public initDBUsers() {
        const openRequest = indexedDB.open(
            environment.nameDbUsers,
            environment.versionDB,
        );
        const namingDb = environment.nameDbUsers;
        return new Observable<IUser[]>((observer) => {
            openRequest.onupgradeneeded = function (event) {
                const db = openRequest.result;

                if (!db.objectStoreNames.contains(namingDb)) {
                    let store = db.createObjectStore(namingDb, {
                        keyPath: 'id',
                    });
                    store.createIndex('login_idx', 'login');
                }
            };
            this.openRequestOnSuccess(openRequest, namingDb).subscribe(
                (users: IUser[]) => {
                    observer.next(users);
                    observer.complete();
                },
            );
        });
    }

    public initDBCollections() {
        const openRequest = indexedDB.open(
            environment.nameDbCollections,
            environment.versionDB,
        );
        const namingDb = environment.nameDbCollections;
        return new Observable<ICollection[]>((observer) => {
            openRequest.onupgradeneeded = function (event) {
                const db = openRequest.result;

                if (!db.objectStoreNames.contains(namingDb)) {
                    let tasks = db.createObjectStore(namingDb, {
                        keyPath: 'id',
                    });
                }
            };
            this.openRequestOnSuccess(openRequest, namingDb).subscribe(
                (collections: ICollection[]) => {
                    observer.next(collections);
                    observer.complete();
                },
            );
        });
    }

    public updateTask(task: ITask): Observable<ITask[]> {
        const currentTasks = this.allTaskSubject.getValue();
        const updatedTasks = currentTasks.map((taskInArr) => {
            if (taskInArr.id === task.id) {
                return task;
            }
            return taskInArr;
        });
        this.allTaskSubject.next(updatedTasks);

        return new Observable<ITask[]>((observer) => {
            const openRequest = indexedDB.open(
                environment.nameDbTasks,
                environment.versionDB,
            );
            openRequest.onsuccess = function (event) {
                const db = openRequest.result;
                const transaction = db.transaction(
                    environment.nameDbTasks,
                    'readwrite',
                );
                const TodoListStore = transaction.objectStore(
                    environment.nameDbTasks,
                );

                if (task.id !== null) {
                    const getRequest = TodoListStore.get(task.id);

                    getRequest.onsuccess = function () {
                        const existingTask = getRequest.result;

                        if (existingTask) {
                            existingTask.isCompleted = task.isCompleted;
                            existingTask.collectionTask = task.collectionTask;
                            const updateRequest =
                                TodoListStore.put(existingTask);
                            updateRequest.onsuccess = function () {
                                const getAllRequest = TodoListStore.getAll();

                                getAllRequest.onsuccess = function () {
                                    const tasks: ITask[] = getAllRequest.result;
                                    observer.next(tasks);
                                    observer.complete();
                                };

                                getAllRequest.onerror = function () {
                                    observer.error(
                                        'Ошибка при получении задач: ' +
                                            getAllRequest.error,
                                    );
                                };
                            };

                            updateRequest.onerror = function () {
                                observer.error(
                                    'Ошибка при обновлении задачи: ' +
                                        updateRequest.error,
                                );
                            };
                        } else {
                            observer.error('Задача не найдена');
                        }
                    };

                    getRequest.onerror = function () {
                        observer.error(
                            'Ошибка при получении задачи: ' + getRequest.error,
                        );
                    };
                } else {
                    observer.error('Некорректный ID задачи');
                }
            };

            openRequest.onerror = function (event) {
                observer.error(
                    'Ошибка при открытии базы данных: ' + openRequest.error,
                );
            };
        }).pipe(
            catchError((error) => {
                console.error(error);
                return throwError(error);
            }),
        );
    }

    public getOneTask(taskId: number): Observable<ITask> {
        const namingDb: string = environment.nameDbTasks;
        return new Observable<ITask>((observer) => {
            const openRequest = indexedDB.open(namingDb, environment.versionDB);

            openRequest.onsuccess = function (event) {
                const db = openRequest.result;
                const transaction = db.transaction(namingDb, 'readonly');
                const TodoListStore = transaction.objectStore(namingDb);

                const getRequest = TodoListStore.get(taskId);

                getRequest.onsuccess = function () {
                    const task: ITask = getRequest.result;
                    if (task) {
                        observer.next(task);
                        observer.complete();
                    } else {
                        observer.error('Задача не найдена');
                    }
                };

                getRequest.onerror = function () {
                    observer.error(
                        'Ошибка при получении задачи: ' + getRequest.error,
                    );
                };
            };

            openRequest.onerror = function (event) {
                observer.error(
                    'Ошибка при открытии базы данных: ' + openRequest.error,
                );
            };
        }).pipe(
            catchError((error) => {
                console.error(error);
                return throwError(error);
            }),
        );
    }

    public registration(user: IUser) {
        if (user.username)
            this.userContextService.setAuthenticatedUser(user.username);
        return this.http.post('addUser', user);
    }

    public loginUser(userLogin: string): Observable<IUser> | undefined {
        const namingDb = environment.nameDbUsers;
        return new Observable<IUser>((observer) => {
            const openRequest = indexedDB.open(namingDb, environment.versionDB);

            openRequest.onsuccess = (event) => {
                const db = openRequest.result;
                const transaction = db.transaction(namingDb, 'readonly');
                const CollectList = transaction.objectStore(namingDb);
                const myIndex = CollectList.index('login_idx');
                const getRequest = myIndex.get(userLogin);

                getRequest.onsuccess = () => {
                    const user: IUser = getRequest.result;
                    observer.next(user);
                    observer.complete();
                };

                getRequest.onerror = () => {
                    const errorMessage =
                        'Ошибка при получении пользователя: ' +
                        getRequest.error;
                    observer.error(errorMessage);
                };
            };

            openRequest.onerror = (event) => {
                const errorMessage =
                    'Ошибка при открытии базы данных: ' + openRequest.error;
                observer.error(errorMessage);
            };
        }).pipe(
            catchError((error) => {
                console.error(error);
                return throwError(error);
            }),
            tap((user) => {
                if (user) {
                    sessionStorage.setItem(
                        'authenticatedUser',
                        JSON.stringify(user.username),
                    );
                }
            }),
        );
    }
}
