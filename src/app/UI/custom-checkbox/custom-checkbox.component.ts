import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ITask } from '../../shared/model/task-model';

@Component({
    selector: 'app-custom-checkbox',
    templateUrl: './custom-checkbox.component.html',
    styleUrls: ['./custom-checkbox.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomCheckboxComponent {
    @Input()
    public task!: ITask;
    @Input()
    public colorTask!: ITask;
}
