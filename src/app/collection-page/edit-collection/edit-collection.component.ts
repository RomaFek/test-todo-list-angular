import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { ITask } from '../../add-task/models/task-model';
import { FormControl, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { DestroyService } from '../../shared/destroy.service';
import { IndexedDBService } from '../../service/indexed-db.service';

@Component({
    selector: 'app-edit-collection',
    templateUrl: './edit-collection.component.html',
    styleUrls: ['./edit-collection.component.scss'],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditCollectionComponent implements OnInit {
    public editCollect: boolean = false;
    @Input()
    public task!: ITask;
    public changeTask!: FormControl<string | null | undefined>;

    constructor(
        private destroy$: DestroyService,
        private indexedDBService: IndexedDBService,
    ) {}

    public ngOnInit() {
        this.changeTask = new FormControl(
            this.task.collectionTask,
            Validators.required,
        );
    }

    public onEdit(task: ITask) {
        this.editCollect = !this.editCollect;
        if (!this.editCollect && this.changeTask.value !== 'collect') {
            const updateCollectTask = {
                ...task,
                collectionTask: this.changeTask.value,
            };
            this.indexedDBService
                .updateTask(updateCollectTask)
                .pipe(takeUntil(this.destroy$))
                .subscribe();
        }
    }

    public collection() {
        return this.indexedDBService.collection$;
    }
}
