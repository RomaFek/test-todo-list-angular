import { Injectable } from '@angular/core';
import { CopyBDService } from '../../main-page/dashboard/services/copy-bd.service';
import { map, Observable } from 'rxjs';
import { IndexedDBService } from '../../service/indexed-db.service';

@Injectable({
    providedIn: 'root',
})
export class UniqCollectionService {
    constructor(
        private copyBDService: CopyBDService,
        private indexedDBService: IndexedDBService,
    ) {}

    public getUniqueCollections(): Observable<(string | null | undefined)[]> {
        return this.indexedDBService.initDBTasks().pipe(
            map((tasks) => {
                const uniqueCollections = Array.from(
                    new Set(tasks.map((task) => task.collectionTask)),
                );
                return uniqueCollections;
            }),
        );
    }

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
