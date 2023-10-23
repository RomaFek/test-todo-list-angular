import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ITask} from "../../../add-task/models/task-model";
import {CopyBDService} from "../../dashboard/services/copy-bd.service";
import {DestroyService} from "../../../shared/destroy.service";
import {filter, map, Observable, of, takeUntil} from "rxjs";
import {AddMiniTaskService} from "../service/add-mini-task.service";
import {ModalService} from "../../../add-task/services/modal.service";
import {IMiniTask} from "../../mini-task/models/mini-task-model";
import {TaskCompleteService} from "../service/task-complete.service";

@Component({
    selector: 'app-card-task',
    templateUrl: './card-task.component.html',
    styleUrls: ['./card-task.component.scss'],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardTaskComponent {

    @Input()
    public arrCol!: Observable<ITask[] | null>;
    public dropDown: boolean = true
    public dropDownMiniTask: boolean = true


    constructor(
        private copyBDService: CopyBDService,
        private destroy$: DestroyService,
        private addMiniTaskService: AddMiniTaskService,
        private modalService: ModalService,
        private taskCompleteService: TaskCompleteService
    ) {
    }


    public isNotCompletedColl() {
        return this.arrCol.pipe(
            map((el) => el ? el.filter((task) => !task.isCompleted) : []),
            filter((el) => el.length > 0)
        )
    }


    public clickDropDown() {
        this.dropDown = !this.dropDown

    }

    public onDragStart(event: DragEvent, coll: any) {
        if (event.dataTransfer)
            event.dataTransfer.setData('text/plain', JSON.stringify(coll));
    }

    public onDrop(event: DragEvent, coll: string | null) {
        event.preventDefault();
        if (coll && event.dataTransfer) {
            const data = JSON.parse(event.dataTransfer.getData('text/plain'));
            const updateData = {...data, collectionTask: coll}
            this.copyBDService.updateTask(updateData).pipe(takeUntil(this.destroy$)).subscribe()
        }
    }

    public allowDrop(event: DragEvent) {
        event.preventDefault();
    }

    public openAddMiniTaskModal(coll: ITask) {
        this.modalService.openAddMiniTaskModal(coll);
    }

    public onMiniTask(task: ITask) {
        return this.addMiniTaskService.allMiniTasks.pipe(map((el) => el.filter(el => el.task_id === task.id)))
    }

    public onCurrentTask(arr: IMiniTask[]) {
        const completTask = arr.filter(el => el.isCompleted)
        return `${completTask.length}/${arr.length}`
    }

    public clickDropDownMiniTask() {
        this.dropDownMiniTask = !this.dropDownMiniTask
    }

    public checkMiniTasks(coll: ITask) {
        this.onMiniTask(coll).pipe(
            filter(miniTasks => miniTasks.length > 0),
            map(miniTasks => {
                if (miniTasks.every(miniTask => miniTask.isCompleted)) {
                    return this.taskCompleteService.changeTaskCompleted(coll);
                } else {
                    return of(null);
                }
            }),
            takeUntil(this.destroy$)
        ).subscribe();
    }


}
