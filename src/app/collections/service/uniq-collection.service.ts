import { Injectable } from '@angular/core';
import { IndexedDBService } from '../../service/indexed-db.service';

@Injectable({
    providedIn: 'root',
})
export class UniqCollectionService {
    constructor(private indexedDBService: IndexedDBService) {}

    // public getUniqueCollections(): Observable<(string | null | undefined)[]> {
    //     this.indexedDBService.();
    //     return this.indexedDBService.allTasks.pipe(
    //         tap((v) => console.log(v)),
    //         map((tasks) =>
    //             tasks.filter((task) => task.collectionTask !== undefined),
    //         ),
    //         map((tasks) => {
    //             return Array.from(
    //                 new Set(tasks.map((task) => task.collectionTask)),
    //             );
    //         }),
    //     );
    // }

    // public getUniqueCollectionTasks(): Observable<(string | undefined)[]> {
    //     return this.copyBDService.allTasks.pipe(
    //         map((arrTasks) =>
    //             arrTasks.filter((task) => task.collectionTask !== null),
    //         ),
    //         map((filteredTasks) => {
    //             const uniqueCollectionTasks = new Set<string | undefined>();
    //             filteredTasks.forEach((task) => {
    //                 uniqueCollectionTasks.add(
    //                     task.collectionTask === null
    //                         ? undefined
    //                         : task.collectionTask,
    //                 );
    //             });
    //             return Array.from(uniqueCollectionTasks);
    //         }),
    //     );
    // }
}
