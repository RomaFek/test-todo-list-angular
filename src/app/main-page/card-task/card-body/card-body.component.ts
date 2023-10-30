import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DragNDropService } from '../service/drag-n-drop.service';
import { TaskCompleteService } from '../service/task-complete.service';
import { ICollectionObjModel } from '../model/collection-obj-model';
import { ModalService } from '../../../add-task/services/modal.service';
import { ITask } from '../../../add-task/models/task-model';

@Component({
    selector: 'app-card-body',
    templateUrl: './card-body.component.html',
    styleUrls: ['./card-body.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardBodyComponent {
    public dropDown: boolean = true;
    public dropDownMiniTask: boolean = true;
    @Input()
    public colData!: ICollectionObjModel;

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

    public clickDropDown() {
        this.dropDown = !this.dropDown;
        console.log(this.dropDown);
    }
}
