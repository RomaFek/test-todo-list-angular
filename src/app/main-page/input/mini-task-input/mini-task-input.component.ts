import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {TaskCompleteService} from "../../card-task/service/task-complete.service";
import {IMiniTask} from "../../mini-task/models/mini-task-model";

@Component({
    selector: 'app-mini-task-input',
    templateUrl: './mini-task-input.component.html',
    styleUrls: ['./mini-task-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MiniTaskInputComponent implements OnInit {
    @Input()
    public taskCol!: IMiniTask
    public isCheckbox!: FormControl<boolean>;

    constructor(public taskCompleteService: TaskCompleteService) {
    }

    public ngOnInit() {
        this.isCheckbox = new FormControl(this.taskCol.isCompleted, {nonNullable: true})
    }

    public changeTaskCompleted(task: IMiniTask) {
        this.taskCompleteService.changeMiniTaskCompleted(task)
    }
}
