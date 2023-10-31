import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ITask } from '../../../../shared/model/task-model';
import { IndexedDBService } from '../../../../shared/service/indexed-db.service';

@Injectable({
    providedIn: 'root',
})
export class FilteredTasksCompletedService {
    constructor(private indexedDBService: IndexedDBService) {}

    private filterTasksByCollection(collection: string): Observable<ITask[]> {
        return this.indexedDBService
            .initDBTasks()
            .pipe(
                map((el) =>
                    el.filter((el) => el.collectionTask === collection),
                ),
            );
    }

    public totalTasksCount$(collection: string): Observable<number> {
        return this.filterTasksByCollection(collection).pipe(
            map((el) => el.length),
        );
    }

    public completedTasksCount$(collection: string): Observable<number> {
        return this.filterTasksByCollection(collection).pipe(
            map((el) => el.filter((el) => el.isCompleted)),
            map((el) => el.length),
        );
    }
}
