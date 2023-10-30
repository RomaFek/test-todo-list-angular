import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { FormControl, Validators } from '@angular/forms';
import { DestroyService } from '../../../shared/service/destroy.service';
import { takeUntil } from 'rxjs';
import { ITask } from '../../../shared/model/task-model';
import { IndexedDBService } from '../../../service/indexed-db.service';

@Component({
    selector: 'app-mini-task',
    templateUrl: './mini-task.component.html',
    styleUrls: ['./mini-task.component.scss'],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniTaskComponent {
    public newMiniTask: FormControl<string | null>;

    constructor(
        public dialogRef: DialogRef<string>,
        @Inject(DIALOG_DATA)
        public data: { coll: ITask },
        public indexedDBService: IndexedDBService,
        private destroy$: DestroyService,
    ) {
        this.newMiniTask = new FormControl('', Validators.required);
    }

    public onSubmit() {
        if (this.newMiniTask.value) {
            const miniTask: ITask = {
                id: Date.now(),
                task_id: this.data.coll.id,
                description: this.newMiniTask.value,
                isCompleted: false,
            };

            this.indexedDBService
                .addTasks(miniTask)
                .pipe(takeUntil(this.destroy$))
                .subscribe();
        }

        this.dialogRef.close();
    }
}
