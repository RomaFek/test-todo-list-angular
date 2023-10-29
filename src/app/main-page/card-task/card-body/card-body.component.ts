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
    ) {
        console.log('0');
    }

    public onDragStart(event: DragEvent, task: ITask) {
        console.log('1');
        this.dragNDropService.onDragStart(event, task);
    }

    public onMiniTask(task: ITask) {
        console.log('2');
        return this.taskCompleteService.onMiniTask(task);
    }

    public clickDropDownMiniTask() {
        console.log('3');
        this.dropDownMiniTask = !this.dropDownMiniTask;
    }

    public openAddMiniTaskModal(coll: ITask) {
        console.log('4');
        this.modalService.openAddMiniTaskModal(coll);
    }

    public checkMiniTasks(task: ITask) {
        console.log('5');
        return this.taskCompleteService.checkMiniTasks(task);
    }

    public clickDropDown() {
        this.dropDown = !this.dropDown;
        console.log(this.dropDown);
    }
}
