import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IndexedDBService } from '../../../../shared/service/indexed-db.service';

@Injectable({
    providedIn: 'root',
})
export class UniqCollectService {
    constructor(private indexedDBService: IndexedDBService) {}

    public getUniqueCollections(): Observable<(string | null | undefined)[]> {
        return this.indexedDBService.allTasks.pipe(
            map((tasks) =>
                tasks.filter((task) => task.collectionTask !== undefined),
            ),
            map((tasks) => {
                return Array.from(
                    new Set(tasks.map((task) => task.collectionTask)),
                );
            }),
        );
    }

    private uniqueObjectTasksInCollection() {
        return this.indexedDBService.allTasks.pipe(
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

    public arrayObjCollectionsNotCompleted$() {
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
