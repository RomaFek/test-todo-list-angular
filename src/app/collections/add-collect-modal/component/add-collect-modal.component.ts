import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DialogRef} from "@angular/cdk/dialog";
import {FormControl, Validators} from "@angular/forms";
import {CollectionArrayService} from "../service/collection-array.service";
import {DestroyService} from "../../../shared/destroy.service";
import {takeUntil} from "rxjs";

@Component({
    selector: 'app-add-collect-modal',
    templateUrl: './add-collect-modal.component.html',
    styleUrls: ['./add-collect-modal.component.scss'],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCollectModalComponent {
    public newCollection: FormControl<string | null>

    constructor(public dialogRef: DialogRef<string>, private collectionArrayService: CollectionArrayService, private destroy$: DestroyService) {
        this.newCollection = new FormControl('', Validators.required)
    }

    public onSubmit() {
        if (this.newCollection.value)
            this.collectionArrayService.setNewCollect(this.newCollection.value).pipe(takeUntil(this.destroy$)).subscribe()

        this.dialogRef.close();
    }
}
