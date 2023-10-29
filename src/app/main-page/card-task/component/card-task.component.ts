import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DestroyService } from '../../../shared/destroy.service';
import { ModalService } from '../../../add-task/services/modal.service';
import { TaskCompleteService } from '../service/task-complete.service';
import { DragNDropService } from '../service/drag-n-drop.service';
import { UniqCollectService } from '../../dashboard/services/uniq-collect.service';
import { ITask } from '../../../add-task/models/task-model';
import { ActivatedRoute } from '@angular/router';
import { CheckCompleteService } from '../service/check-complete.service';
import { takeUntil } from 'rxjs';

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
    private pathSegments!: string;

    constructor(
        private modalService: ModalService,
        private taskCompleteService: TaskCompleteService,
        private dragNDropService: DragNDropService,
        private uniqCollectService: UniqCollectService,
        private route: ActivatedRoute,
        private destroy$: DestroyService,
        private checkCompleteService: CheckCompleteService,
    ) {
        this.route.url.pipe(takeUntil(this.destroy$)).subscribe((segments) => {
            this.pathSegments = segments.map((segment) => segment.path).join();
        });
        // this.arrayCollect$();
    }

    public clickDropDown() {
        this.dropDown = !this.dropDown;
    }

    public clickDropDownMiniTask() {
        this.dropDownMiniTask = !this.dropDownMiniTask;
    }

    public arrayCollect$() {
        if (this.pathSegments === 'today') {
            return this.checkCompleteService.arrayObjCollectionToday$();
        }
        if (this.pathSegments === 'wasted') {
            return this.checkCompleteService.arrayObjCollectionsWasted$();
        } else
            return this.uniqCollectService.arrayObjCollectionsNotCompleted$();
        // .subscribe((v) => console.log(v));
    }

    public onDrop($event: DragEvent, collection: string | null | undefined) {
        this.dragNDropService.onDrop($event, collection);
    }

    public allowDrop($event: DragEvent) {
        this.dragNDropService.allowDrop($event);
    }

    public onDragStart(event: DragEvent, task: ITask) {
        this.dragNDropService.onDragStart(event, task);
    }

    public onMiniTask(task: ITask) {
        return this.taskCompleteService.onMiniTask(task);
    }

    public checkMiniTasks(task: ITask) {
        return this.taskCompleteService.checkMiniTasks(task);
    }

    public openAddMiniTaskModal(coll: ITask) {
        this.modalService.openAddMiniTaskModal(coll);
    }
}
