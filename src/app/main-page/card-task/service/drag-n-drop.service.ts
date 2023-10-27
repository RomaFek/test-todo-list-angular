import { Injectable, OnDestroy } from '@angular/core';
import { CopyBDService } from '../../dashboard/services/copy-bd.service';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DragNDropService extends Subject<void> implements OnDestroy {
    constructor(private copyBDService: CopyBDService) {
        super();
    }

    public onDragStart(event: DragEvent, coll: any) {
        if (event.dataTransfer)
            event.dataTransfer.setData('text/plain', JSON.stringify(coll));
    }

    public onDrop(event: DragEvent, coll: string | null | undefined) {
        event.preventDefault();
        if (coll && event.dataTransfer) {
            const data = JSON.parse(event.dataTransfer.getData('text/plain'));
            const updateData = { ...data, collectionTask: coll };
            this.copyBDService.updateTask(updateData).subscribe();
        }
    }

    public allowDrop(event: DragEvent) {
        event.preventDefault();
    }

    ngOnDestroy() {
        this.next();
        this.complete();
    }
}
