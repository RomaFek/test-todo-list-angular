import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { FormControl, Validators } from '@angular/forms';
import { DestroyService } from '../../../shared/service/destroy.service';
import { takeUntil } from 'rxjs';
import { IndexedDBService } from '../../../service/indexed-db.service';

@Component({
    selector: 'app-add-collect-modal',
    templateUrl: './add-collect-modal.component.html',
    styleUrls: ['./add-collect-modal.component.scss'],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCollectModalComponent {
    public newCollection: FormControl<string | null>;

    constructor(
        private dialogRef: DialogRef<string>,
        private indexedDBService: IndexedDBService,
        private destroy$: DestroyService,
    ) {
        this.newCollection = new FormControl('', Validators.required);
    }

    public onSubmit() {
        if (this.newCollection.value)
            this.indexedDBService
                .addNewCollect(this.newCollection.value)
                .pipe(takeUntil(this.destroy$))
                .subscribe();

        this.dialogRef.close();
    }
}
