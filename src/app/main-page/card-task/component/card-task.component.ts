import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DestroyService } from '../../../shared/destroy.service';
import { ModalService } from '../../../add-task/services/modal.service';
import { TaskCompleteService } from '../service/task-complete.service';
import { DragNDropService } from '../service/drag-n-drop.service';
import { UniqCollectService } from '../../dashboard/services/uniq-collect.service';

@Component({
    selector: 'app-card-task',
    templateUrl: './card-task.component.html',
    styleUrls: ['./card-task.component.scss'],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardTaskComponent {
    public dropDown: boolean = true;
    public dropDownMiniTask: boolean = true;

    constructor(
        public modalService: ModalService,
        public taskCompleteService: TaskCompleteService,
        public dragNDropService: DragNDropService,
        public uniqCollectService: UniqCollectService,
    ) {}

    public clickDropDown() {
        this.dropDown = !this.dropDown;
    }

    public clickDropDownMiniTask() {
        this.dropDownMiniTask = !this.dropDownMiniTask;
    }
}
