import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ITask } from '../../../../../../shared/model/task-model';
import { isBefore, isToday, parseISO } from 'date-fns';
import { UniqCollectService } from '../../../services/uniq-collect.service';

@Injectable({
    providedIn: 'root',
})
export class CheckCompleteService {
    constructor(private uniqCollectService: UniqCollectService) {}

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

    private isTaskWasted(task: ITask): boolean {
        if (!task.endDate) return false;
        const endDate = parseISO(task.endDate);
        const currentDate = new Date();
        return isBefore(endDate, currentDate);
    }

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

    private isTaskDueToday(task: ITask): boolean {
        if (!task.endDate) return false;
        const taskEndDate = new Date(task.endDate);
        return isToday(taskEndDate);
    }
}
