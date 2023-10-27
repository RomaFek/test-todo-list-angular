import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ITask } from '../../add-task/models/task-model';
import { CollectionArrayService } from '../../collections/add-collect-modal/service/collection-array.service';
import { FormControl, Validators } from '@angular/forms';
import { CopyBDService } from '../../main-page/dashboard/services/copy-bd.service';
import { takeUntil } from 'rxjs';
import { DestroyService } from '../../shared/destroy.service';

@Component({
  selector: 'app-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditCollectionComponent implements OnInit {
  public editCollect: boolean = false;
  @Input()
  public task!: ITask;
  public changeTask!: FormControl<string | null | undefined>;

  constructor(
    public collectionArrayService: CollectionArrayService,
    private copyBDService: CopyBDService,
    private destroy$: DestroyService,
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
      this.copyBDService
        .updateTask(updateCollectTask)
        .pipe(takeUntil(this.destroy$))
        .subscribe();
    }
  }
}
