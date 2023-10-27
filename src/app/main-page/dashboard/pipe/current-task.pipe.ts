import { Pipe, PipeTransform } from '@angular/core';
import { IMiniTask } from '../../mini-task/models/mini-task-model';

@Pipe({
    name: 'currentTask',
})
export class CurrentTaskPipe implements PipeTransform {
    transform(value: IMiniTask[]): string {
        if (value.length === 0) {
            return '';
        }
        const completTask = value.filter((el) => el.isCompleted);
        return `${completTask.length}/${value.length}`;
    }
}
