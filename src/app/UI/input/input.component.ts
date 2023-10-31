import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { ITask } from '../../shared/model/task-model';
import { FormControl } from '@angular/forms';
import { TaskCompleteService } from '../../backoffice/component/main-page/card-task/service/task-complete.service';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnInit {
    @Input()
    public task!: ITask;
    public isCheckbox!: FormControl<boolean>;

    constructor(private taskCompleteService: TaskCompleteService) {}

    public ngOnInit() {
        this.isCheckbox = new FormControl(this.task.isCompleted, {
            nonNullable: true,
        });
    }

    public changeTaskCompleted(task: ITask) {
        this.taskCompleteService.changeTaskCompleted(task);
    }
}
