import { ITask } from '../../../add-task/models/task-model';

export interface ICollectionObjModel {
    collection: string | null | undefined;
    tasks: ITask[];
}
