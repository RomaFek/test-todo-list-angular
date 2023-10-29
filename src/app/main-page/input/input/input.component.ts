import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { ITask } from '../../../add-task/models/task-model';
import { FormControl } from '@angular/forms';
import { TaskCompleteService } from '../../card-task/service/task-complete.service';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnInit {
    @Input()
    public taskCol!: ITask;
    @Input()
    public miniTask!: ITask;
    public isCheckbox!: FormControl<boolean>;

    constructor(private taskCompleteService: TaskCompleteService) {}

    public ngOnInit() {
        this.isCheckbox = new FormControl(this.taskCol.isCompleted, {
            nonNullable: true,
        });
    }

    public changeTaskCompleted(taskCol: ITask) {
        this.taskCompleteService.changeTaskCompleted(taskCol);
    }
}
