import { Inject, Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ITask } from '../add-task/models/task-model';
import { IUser } from '../auth/model/user-model';
import { ICollection } from '../collections/model/collection';

@Injectable({
  providedIn: 'root',
})
export class IndexedDBService {
  constructor(
    // @Inject('nameDbSubTasks') private nameDbSubTasks: string,
    @Inject('nameDbTasks') private nameDbTasks: string,
    @Inject('nameDbCollections') private nameDbCollections: string,
    @Inject('nameDbUsers') private nameDbUsers: string,
    @Inject('versionDB') private versionDB: number,
  ) {}

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
          observer.error('Ошибка при получении задач: ' + getAllRequest.error);
        };
      };
    });
  }

  public initDBTasks() {
    const openRequest = indexedDB.open(this.nameDbTasks, this.versionDB);
    const namingDb = this.nameDbTasks;
    return new Observable<ITask[]>((observer) => {
      openRequest.onupgradeneeded = function (event) {
        const db = openRequest.result;

        if (!db.objectStoreNames.contains(namingDb)) {
          let tasks = db.createObjectStore(namingDb, { keyPath: 'id' });
          tasks.createIndex('collectionTask', 'collectionTask');
        }
      };
      this.openRequestOnSuccess(openRequest, namingDb);
    });
  }

  // public initDBSubTasks() {
  //   const openRequest = indexedDB.open(this.nameDbSubTasks, this.versionDB);
  //   const namingDb = this.nameDbSubTasks;
  //   return new Observable<ITask[]>((observer) => {
  //     openRequest.onupgradeneeded = function (event) {
  //       const db = openRequest.result;
  //
  //       if (!db.objectStoreNames.contains(namingDb)) {
  //         let store = db.createObjectStore(namingDb, { keyPath: 'id' });
  //         store.createIndex('task_id', 'task_id');
  //       }
  //     };
  //     this.openRequestOnSuccess(openRequest, namingDb);
  //   });
  // }

  public initDBUsers() {
    const openRequest = indexedDB.open(this.nameDbUsers, this.versionDB);
    const namingDb = this.nameDbUsers;
    return new Observable<IUser[]>((observer) => {
      openRequest.onupgradeneeded = function (event) {
        const db = openRequest.result;

        if (!db.objectStoreNames.contains(namingDb)) {
          let store = db.createObjectStore(namingDb, { keyPath: 'id' });
          store.createIndex('login_idx', 'login');
        }
      };
      this.openRequestOnSuccess(openRequest, namingDb);
    });
  }

  public initDBCollections() {
    const openRequest = indexedDB.open(this.nameDbCollections, this.versionDB);
    const namingDb = this.nameDbCollections;
    return new Observable<ICollection[]>((observer) => {
      openRequest.onupgradeneeded = function (event) {
        const db = openRequest.result;

        if (!db.objectStoreNames.contains(namingDb)) {
          let tasks = db.createObjectStore(namingDb, { keyPath: 'id' });
        }
      };
      this.openRequestOnSuccess(openRequest, namingDb);
    });
  }

  public updateTask(task: ITask): Observable<ITask[]> {
    let namingDb: string = this.nameDbTasks;
    // if (task.task_id) {
    //   namingDb = this.nameDbSubTasks;
    // } else {
    //   namingDb = this.nameDbTasks;
    // }
    return new Observable<ITask[]>((observer) => {
      const openRequest = indexedDB.open(namingDb, this.versionDB);
      openRequest.onsuccess = function (event) {
        const db = openRequest.result;
        const transaction = db.transaction(namingDb, 'readwrite');
        const TodoListStore = transaction.objectStore(namingDb);

        if (task.id !== null) {
          const getRequest = TodoListStore.get(task.id);

          getRequest.onsuccess = function () {
            const existingTask = getRequest.result;

            if (existingTask) {
              existingTask.isCompleted = task.isCompleted;
              existingTask.collectionTask = task.collectionTask;
              const updateRequest = TodoListStore.put(existingTask);
              updateRequest.onsuccess = function () {
                const getAllRequest = TodoListStore.getAll();

                getAllRequest.onsuccess = function () {
                  const tasks: ITask[] = getAllRequest.result;
                  observer.next(tasks);
                  observer.complete();
                };

                getAllRequest.onerror = function () {
                  observer.error(
                    'Ошибка при получении задач: ' + getAllRequest.error,
                  );
                };
              };

              updateRequest.onerror = function () {
                observer.error(
                  'Ошибка при обновлении задачи: ' + updateRequest.error,
                );
              };
            } else {
              observer.error('Задача не найдена');
            }
          };

          getRequest.onerror = function () {
            observer.error('Ошибка при получении задачи: ' + getRequest.error);
          };
        } else {
          observer.error('Некорректный ID задачи');
        }
      };

      openRequest.onerror = function (event) {
        observer.error('Ошибка при открытии базы данных: ' + openRequest.error);
      };
    }).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(error);
      }),
    );
  }

  public getOneTask(taskId: number): Observable<ITask> {
    const namingDb: string = this.nameDbTasks;
    return new Observable<ITask>((observer) => {
      const openRequest = indexedDB.open(namingDb, this.versionDB);

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
          observer.error('Ошибка при получении задачи: ' + getRequest.error);
        };
      };

      openRequest.onerror = function (event) {
        observer.error('Ошибка при открытии базы данных: ' + openRequest.error);
      };
    }).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(error);
      }),
    );
  }

  public loginUser(userLogin: string): Observable<IUser> | undefined {
    const namingDb = this.nameDbUsers;
    return new Observable<IUser>((observer) => {
      const openRequest = indexedDB.open(namingDb, this.versionDB);

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
            'Ошибка при получении пользователя: ' + getRequest.error;
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
