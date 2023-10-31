import { Injectable, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IndexedDBService } from '../../../../../../shared/service/indexed-db.service';
import { ITask } from '../../../../../../shared/model/task-model';

@Injectable({
    providedIn: 'root',
})
export class DragNDropService implements OnDestroy {
    private destroy$: Subject<void> = new Subject();

    constructor(private indexedDBService: IndexedDBService) {}

    public onDragStart(event: DragEvent, coll: ITask) {
        if (event.dataTransfer)
            event.dataTransfer.setData('text/plain', JSON.stringify(coll));
    }

    public onDrop(event: DragEvent, coll: string | null | undefined) {
        event.preventDefault();
        if (coll && event.dataTransfer) {
            const data = JSON.parse(event.dataTransfer.getData('text/plain'));
            const updateData = { ...data, collectionTask: coll };
            this.indexedDBService
                .updateTask(updateData)
                .pipe(takeUntil(this.destroy$))
                .subscribe();
        }
    }

    public allowDrop(event: DragEvent) {
        event.preventDefault();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
