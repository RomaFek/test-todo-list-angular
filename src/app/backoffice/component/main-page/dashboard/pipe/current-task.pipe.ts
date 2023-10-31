import {Pipe, PipeTransform} from '@angular/core';
import {ITask} from '../../../../../shared/model/task-model'; // import { IMiniTask } from '../../add-mini-task/models/add-mini-task-model';

// import { IMiniTask } from '../../add-mini-task/models/add-mini-task-model';

@Pipe({
    name: 'currentTask',
})
export class CurrentTaskPipe implements PipeTransform {
    transform(value: ITask[]): string {
        if (value.length === 0) {
            return '';
        }
        const completTask = value.filter((el) => el.isCompleted);
        return `${completTask.length}/${value.length}`;
    }
}
