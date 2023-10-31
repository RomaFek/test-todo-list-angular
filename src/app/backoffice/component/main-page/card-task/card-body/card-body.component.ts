import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DragNDropService } from '../service/drag-n-drop.service';
import { TaskCompleteService } from '../service/task-complete.service';
import { ICollectionObjModel } from '../../../../../shared/model/collection-obj-model';
import { ModalService } from '../../../../../navbar/add-task/services/modal.service';
import { ITask } from '../../../../../shared/model/task-model';

@Component({
    selector: 'app-card-body',
    templateUrl: './card-body.component.html',
    styleUrls: ['./card-body.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardBodyComponent {
    // public dropDown: boolean = true;
    public dropDownMiniTask: boolean = true;
    @Input()
    public colData!: ICollectionObjModel;
    @Input()
    public dropDown!: boolean;

    constructor(
        private modalService: ModalService,
        private dragNDropService: DragNDropService,
        private taskCompleteService: TaskCompleteService,
    ) {}

    public onDragStart(event: DragEvent, task: ITask) {
        this.dragNDropService.onDragStart(event, task);
    }

    public onMiniTask(task: ITask) {
        return this.taskCompleteService.onMiniTask(task);
    }

    public clickDropDownMiniTask() {
        this.dropDownMiniTask = !this.dropDownMiniTask;
    }

    public openAddMiniTaskModal(coll: ITask) {
        this.modalService.openAddMiniTaskModal(coll);
    }

    public checkMiniTasks(task: ITask) {
        return this.taskCompleteService.checkMiniTasks(task);
    }

    public dropDownIcon() {
        return this.dropDownMiniTask ? 'arrow_drop_up' : 'arrow_drop_down';
    }
}
