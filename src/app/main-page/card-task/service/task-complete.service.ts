import { Injectable, OnDestroy } from '@angular/core';
import { ITask } from '../../../add-task/models/task-model';
import { filter, map, Observable, of, Subject, switchMap } from 'rxjs';
import { CopyBDService } from '../../dashboard/services/copy-bd.service';
import { AddMiniTaskService } from './add-mini-task.service';
import { IndexedDBService } from '../../../service/indexed-db.service';

@Injectable({
    providedIn: 'root',
})
export class TaskCompleteService extends Subject<void> implements OnDestroy {
    constructor(
        private copyBDService: CopyBDService,
        private addMiniTaskService: AddMiniTaskService,
        private indexedDBService: IndexedDBService,
    ) {
        super();
    }

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
                )
                .subscribe();
        }
    }

    // public changeMiniTaskCompleted(task: IMiniTask) {
    //     if (task.id) {
    //         this.addMiniTaskService
    //             .getOneMiniTask(task.id)
    //             .pipe(
    //                 switchMap((oneTask) => {
    //                     if (oneTask) {
    //                         const updatedTask: IMiniTask = {
    //                             ...task,
    //                             isCompleted: !oneTask.isCompleted,
    //                         };
    //                         return this.addMiniTaskService.updateMiniTask(
    //                             updatedTask,
    //                         );
    //                     } else {
    //                         return of(null);
    //                     }
    //                 }),
    //             )
    //             .subscribe();
    //     }
    // }

    public onMiniTask(task: ITask) {
        return this.addMiniTaskService.allMiniTasks.pipe(
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
        this.next();
        this.complete();
    }
}
