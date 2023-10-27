import { Injectable } from '@angular/core';
import { ITask } from '../../add-task/models/task-model';

@Injectable({
  providedIn: 'root',
})
export class UniqCollectionService {
  public getUniqueCollections(tasks: ITask[]): (string | null | undefined)[] {
    const uniqueCollections = Array.from(
      new Set(tasks.map((task) => task.collectionTask)),
    );
    return uniqueCollections;
  }

  public getUniqueCollectionTasks(
    tasks: ITask[] | null,
  ): (string | undefined)[] {
    if (tasks === null) {
      return [];
    }

    const uniqueCollectionTasks = new Set<string | undefined>();
    tasks.forEach((task) => {
      if (task.collectionTask !== null) {
        uniqueCollectionTasks.add(task.collectionTask);
      }
    });
    return Array.from(uniqueCollectionTasks);
  }
}
