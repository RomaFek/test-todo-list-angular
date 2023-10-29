// import { Injectable } from '@angular/core';
// import {
//     HttpEvent,
//     HttpHandler,
//     HttpInterceptor,
//     HttpRequest,
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { ModalService } from '../add-task/services/modal.service';
// import { mergeMap } from 'rxjs/operators';
// import { ITask } from '../add-task/models/task-model';
//
// @Injectable()
// export class AddMiniTaskInterceptor implements HttpInterceptor {
//     constructor(private modalService: ModalService) {}
//
//     public openModalError() {
//         this.modalService.openModalError();
//     }
//
//     public intercept(
//         request: HttpRequest<any>,
//         next: HttpHandler,
//     ): Observable<HttpEvent<any>> {
//         if (request.url === 'addMiniTask') {
//             const failureProbability = 0.1;
//             if (Math.random() < failureProbability) {
//                 this.openModalError();
//             } else {
//                 return this.addToIndexedDB(request.body).pipe(
//                     mergeMap(() => next.handle(request)),
//                 );
//             }
//         }
//         return next.handle(request);
//     }
//
//     private addToIndexedDB(collData: ITask): Observable<void> {
//         return new Observable<void>((observer) => {
//             const openRequest = indexedDB.open('miniTaskStore', 5);
//
//             openRequest.onsuccess = function (event) {
//                 const db = openRequest.result;
//                 const transaction = db.transaction(
//                     'miniTaskStore',
//                     'readwrite',
//                 );
//                 const TodoListStore = transaction.objectStore('miniTaskStore');
//                 const request = TodoListStore.add(collData);
//
//                 request.onsuccess = function () {
//                     console.log(
//                         'Подзадача успешно добавлена в хранилище',
//                         request.result,
//                     );
//                 };
//
//                 request.onerror = function () {
//                     console.error(
//                         'Ошибка при добавлении подзадачи',
//                         request.error,
//                     );
//                 };
//             };
//
//             openRequest.onerror = function (event) {
//                 console.error(
//                     'Ошибка при открытии базы данных',
//                     openRequest.error,
//                 );
//             };
//         });
//     }
// }
