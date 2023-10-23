import {Injectable} from '@angular/core';
import {ITask} from "../../add-task/models/task-model";

@Injectable({
    providedIn: 'root'
})
export class UniqCollectionService {

    public getUniqueCollections(tasks: ITask[]): (string | null)[] {
        const uniqueCollections = Array.from(new Set(tasks.map(task => task.collectionTask)));
        return uniqueCollections;
    }

    public getUniqueCollectionTasks(tasks: ITask[] | null): string[] {
        if (tasks === null) {
            return [];
        }

        const uniqueCollectionTasks = new Set<string>();
        tasks.forEach(task => {
            if (task.collectionTask !== null) {
                uniqueCollectionTasks.add(task.collectionTask);
            }
        });
        return Array.from(uniqueCollectionTasks);
    }
}
