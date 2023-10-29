import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { CopyBDService } from './copy-bd.service';
import { IndexedDBService } from '../../../service/indexed-db.service';

@Injectable({
    providedIn: 'root',
})
export class UniqCollectService implements OnInit {
    // allTaskSubject$: BehaviorSubject<ITask[]> = new BehaviorSubject<ITask[]>(
    //     [],
    // );
    constructor(
        private copyBDService: CopyBDService,
        private indexedDBService: IndexedDBService,
    ) {}

    ngOnInit() {}

    private getTasks() {
        return this.indexedDBService.initDBTasks();
    }

    private uniqueObjectTasksInCollection() {
        // if (this.copyBDService.allTaskSubject$.value.length === 0) {
        //     console.log(123123123);
        //     this.getTasks()
        //         .pipe(
        //             tap((v) => console.log(v, '----')),
        //             take(1),
        //         )
        //         .subscribe((tasks: ITask[]) => {
        //             this.copyBDService.allTaskSubject$.next(tasks);
        //         });
        // }
        console.log(7777);
        return this.indexedDBService.initDBTasks().pipe(
            map((tasks) => {
                const uniqueCollections = Array.from(
                    new Set(tasks.map((task) => task.collectionTask)),
                );
                return uniqueCollections
                    .filter((el) => el !== undefined)
                    .map((collectionsString) => ({
                        collection: collectionsString,
                        tasks: tasks.filter(
                            (task) => task.collectionTask === collectionsString,
                        ),
                    }));
            }),
        );
    }

    // private uniqueObjectTasksInCollection() {
    //     if (this.copyBDService.allTaskSubject$.value.length === 0) {
    //         console.log(123123123);
    //         return this.getTasks().pipe(
    //             tap((v) => console.log(v, '----')),
    //             take(1),
    //             switchMap((tasks: ITask[]) => {
    //                 this.copyBDService.allTaskSubject$.next(tasks);
    //                 return this.indexedDBService.initDBTasks();
    //             }),
    //         );
    //     }
    //     return this.indexedDBService.initDBTasks().pipe(
    //         map((tasks) => {
    //             const uniqueCollections = Array.from(
    //                 new Set(tasks.map((task) => task.collectionTask)),
    //             );
    //             return uniqueCollections.map((collectionsString) => ({
    //                 collection: collectionsString,
    //                 tasks: tasks.filter(
    //                     (task) => task.collectionTask === collectionsString,
    //                 ),
    //             }));
    //         }),
    //     );
    // }

    public arrayObjCollectionsNotCompleted$() {
        console.log(9999);
        return this.uniqueObjectTasksInCollection().pipe(
            map((uniqueCollections) => {
                return uniqueCollections
                    .map((collectionObj) => ({
                        collection: collectionObj.collection,
                        tasks: collectionObj.tasks.filter(
                            (task) => !task.isCompleted,
                        ),
                    }))
                    .filter(
                        (allCollectionObj) => allCollectionObj.tasks.length > 0,
                    );
            }),
        );
    }
}
