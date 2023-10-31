import { Injectable, OnDestroy } from '@angular/core';
import { ITask } from '../../../../../../shared/model/task-model';
import {
    filter,
    map,
    Observable,
    of,
    Subject,
    switchMap,
    takeUntil,
} from 'rxjs';
import { IndexedDBService } from '../../../../../../shared/service/indexed-db.service';

@Injectable({
    providedIn: 'root',
})
export class TaskCompleteService implements OnDestroy {
    private destroy$: Subject<void> = new Subject();

    constructor(private indexedDBService: IndexedDBService) {}

    public changeTaskCompleted(task: ITask) {
        if (task.id) {
            this.indexedDBService
                .getOneTask(task.id)
                .pipe(
                    switchMap((oneTask) => {
                        if (oneTask) {
                            const updatedTask: ITask = {
                                ...task,
                                isCompleted: !oneTask.isCompleted,
                            };
                            return this.indexedDBService.updateTask(
                                updatedTask,
                            );
                        } else {
                            return of(null);
                        }
                    }),
                    takeUntil(this.destroy$),
                )
                .subscribe();
        }
    }

    public onMiniTask(task: ITask) {
        return this.indexedDBService.allTasks.pipe(
            map((el) => el.filter((el) => el.task_id === task.id)),
        );
    }

    public checkMiniTasks(coll: ITask): Observable<void | Observable<null>> {
        return this.onMiniTask(coll).pipe(
            filter((miniTasks) => miniTasks.length > 0),
            map((miniTasks) => {
                if (miniTasks.every((miniTask) => miniTask.isCompleted)) {
                    return this.changeTaskCompleted(coll);
                } else {
                    return of(null);
                }
            }),
        );
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
