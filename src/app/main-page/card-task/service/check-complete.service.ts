import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ITask } from '../../../shared/model/task-model';
import { isBefore, isToday, parseISO } from 'date-fns';
import { UniqCollectService } from '../../dashboard/services/uniq-collect.service';
import { IndexedDBService } from '../../../service/indexed-db.service';

@Injectable({
    providedIn: 'root',
})
export class CheckCompleteService {
    constructor(
        private uniqCollectService: UniqCollectService,
        private indexedDBService: IndexedDBService,
    ) {}

    // public wastedTaskCollectionsString$: Observable<
    //     (string | null | undefined)[]
    // > = this.indexedDBService
    //     .initDBTasks()
    //     .pipe(
    //         switchMap((tasks) =>
    //             this.filterAndTransformTasksWasted(tasks).pipe(
    //                 map((el) => Array.from(new Set(el))),
    //             ),
    //         ),
    //     );

    // public isNotCompletedTasksWasted$(
    //     arrCol: Observable<ITask[] | null>,
    // ): Observable<ITask[] | null> {
    //     return arrCol.pipe(
    //         map((el) => el || []),
    //         map((el) => el.filter((task) => !task.isCompleted)),
    //         filter((el) => el.length > 0),
    //         map((el) => el.filter((task) => this.isTaskWasted(task))),
    //     );
    // }

    public arrayObjCollectionsWasted$() {
        return this.uniqCollectService.arrayObjCollectionsNotCompleted$().pipe(
            map((collections) => {
                return collections
                    .map((collection) => ({
                        collection: collection.collection,
                        tasks: collection.tasks.filter((task) =>
                            this.isTaskWasted(task),
                        ),
                    }))
                    .filter((collection) => collection.tasks.length > 0);
            }),
        );
    }

    // private filterAndTransformTasksWasted(
    //     tasks: ITask[] | null,
    // ): Observable<(string | null | undefined)[]> {
    //     return of(tasks || []).pipe(
    //         map((el) => el || []),
    //         map((el) => el.filter((task) => !task.isCompleted)),
    //         map((el) => el.filter((task) => this.isTaskWasted(task))),
    //         map((el) => el.map((task) => task.collectionTask)),
    //     );
    // }

    private isTaskWasted(task: ITask): boolean {
        if (!task.endDate) return false;
        const endDate = parseISO(task.endDate);
        const currentDate = new Date();
        return isBefore(endDate, currentDate);
    }

    // public isNotCompletedTasksToday$(
    //     arrCol: Observable<ITask[] | null | undefined>,
    // ): Observable<ITask[] | null> {
    //     return arrCol.pipe(
    //         map((el) => el || []),
    //         map((el) => el.filter((task) => !task.isCompleted)),
    //         filter((el) => el.length > 0),
    //         map((el) => el.filter((task) => this.isTaskDueToday(task))),
    //     );
    // }

    // public todayTaskCollectionsString$: Observable<
    //     (string | null | undefined)[]
    // > = this.indexedDBService
    //     .initDBTasks()
    //     .pipe(
    //         switchMap((tasks) =>
    //             this.filterAndTransformTasksToday(tasks).pipe(
    //                 map((el) => Array.from(new Set(el))),
    //             ),
    //         ),
    //     );

    public arrayObjCollectionToday$() {
        return this.uniqCollectService.arrayObjCollectionsNotCompleted$().pipe(
            map((collections) => {
                const currentDate = new Date();
                return collections
                    .map((collection) => ({
                        collection: collection.collection,
                        tasks: collection.tasks.filter((task) =>
                            this.isTaskDueToday(task),
                        ),
                    }))
                    .filter((collection) => collection.tasks.length > 0);
            }),
        );
    }

    // private filterAndTransformTasksToday(
    //     tasks: ITask[] | null,
    // ): Observable<(string | null | undefined)[]> {
    //     return of(tasks || []).pipe(
    //         map((el) => el.filter((task) => this.isTaskDueToday(task))),
    //         map((el) => el.map((task) => task.collectionTask)),
    //     );
    // }

    private isTaskDueToday(task: ITask): boolean {
        if (!task.endDate) return false;
        const taskEndDate = new Date(task.endDate);
        return isToday(taskEndDate);
    }
}
