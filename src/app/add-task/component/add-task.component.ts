import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DestroyService } from '../../shared/destroy.service';
import { takeUntil } from 'rxjs';
import { ITask } from '../models/task-model';
import { IndexedDBService } from '../../service/indexed-db.service';

@Component({
    selector: 'app-add-task',
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.scss'],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTaskComponent {
    public submitted = false;
    public newTaskGroup!: FormGroup<{
        description: FormControl<string | null>;
        endDate: FormControl<string | null>;
        collectionTask: FormControl<string | null>;
    }>;

    constructor(
        private dialogRef: DialogRef<string>,
        private destroy$: DestroyService,
        private indexedDBService: IndexedDBService,
    ) {
        this._createForm();
    }

    private _createForm() {
        this.newTaskGroup = new FormGroup({
            description: new FormControl('', Validators.required),
            endDate: new FormControl(''),
            collectionTask: new FormControl('', Validators.required),
        });
    }

    public createTask() {
        this.submitted = true;
        if (this.newTaskGroup.valid) {
            const description = this.newTaskGroup.controls.description.value;
            const collectionTask =
                this.newTaskGroup.controls.collectionTask.value;
            const endDate = this.newTaskGroup.controls.endDate.value;
            const data: ITask = {
                id: Date.now(),
                description,
                collectionTask,
                endDate,
                isCompleted: false,
            };
            this.indexedDBService
                .addTasks(data)
                .pipe(takeUntil(this.destroy$))
                .subscribe();
            this.dialogRef.close();
        } else {
            console.log('Форма не прошла валидацию. Задача не будет создана.');
        }
    }

    public collection$() {
        return this.indexedDBService.collection$;
    }

    public closeModal() {
        this.dialogRef.close();
    }
}
