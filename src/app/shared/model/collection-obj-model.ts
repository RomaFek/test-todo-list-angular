import { ITask } from './task-model';

export interface ICollectionObjModel {
    collection: string | null | undefined;
    tasks: ITask[];
}
