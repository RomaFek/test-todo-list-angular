import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ITask } from '../../../../shared/model/task-model';
import { FormControl } from '@angular/forms';
import { TaskCompleteService } from '../../main-page/card-task/service/task-complete.service';

@Component({
    selector: 'app-task-board',
    templateUrl: './task-board.component.html',
    styleUrls: ['./task-board.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskBoardComponent {
    @Input()
    tasks!: ITask[];
    public isCheckbox: FormControl<boolean>;

    constructor(private taskCompleteService: TaskCompleteService) {
        this.isCheckbox = new FormControl(true, { nonNullable: true });
    }

    public changeTaskCompleted(task: ITask) {
        return this.taskCompleteService.changeTaskCompleted(task);
    }
}
