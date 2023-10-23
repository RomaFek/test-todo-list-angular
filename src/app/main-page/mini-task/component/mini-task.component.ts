import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {FormControl, Validators} from "@angular/forms";
import {AddMiniTaskService} from "../../card-task/service/add-mini-task.service";
import {DestroyService} from "../../../shared/destroy.service";
import {takeUntil} from "rxjs";
import {IMiniTask} from "../models/mini-task-model";
import {ITask} from "../../../add-task/models/task-model";


@Component({
    selector: 'app-mini-task',
    templateUrl: './mini-task.component.html',
    styleUrls: ['./mini-task.component.scss'],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MiniTaskComponent {
    public newMiniTask: FormControl<string | null>

    constructor(
        public dialogRef: DialogRef<string>,
        @Inject(DIALOG_DATA)
        public data: { coll: ITask },
        public addMiniTaskService: AddMiniTaskService,
        private destroy$: DestroyService
    ) {
        this.newMiniTask = new FormControl('', Validators.required)
    }

    public onSubmit() {
        if (this.newMiniTask.value) {
            const miniTask: IMiniTask = {
                id: Date.now(),
                task_id: this.data.coll.id,
                description: this.newMiniTask.value,
                isCompleted: false,
            };

            this.addMiniTaskService.setNewMiniTask(miniTask).pipe(takeUntil(this.destroy$)).subscribe();
        }

        this.dialogRef.close();
    }

}
