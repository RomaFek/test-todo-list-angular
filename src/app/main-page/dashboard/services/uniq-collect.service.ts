import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CopyBDService } from './copy-bd.service';
import { DateFormatService } from './date-format.service';

@Injectable({
    providedIn: 'root',
})
export class UniqCollectService {
    private date = new Date();

    constructor(
        private copyBDService: CopyBDService,
        private dateFormatService: DateFormatService,
    ) {}

    public uniqCollect() {
        return this.copyBDService.allTasks.pipe(
            map((tasks) => {
                const uniqueCollections = [
                    ...new Set(tasks.map((task) => task.collectionTask)),
                ];
                return uniqueCollections.map((col) => ({
                    collection: col,
                    tasks: tasks.filter((task) => task.collectionTask === col),
                }));
            }),
        );
    }

    public arrayCollect$() {
        return this.uniqCollect().pipe(
            map((uniqueCollections) => {
                return uniqueCollections
                    .map((collection) => ({
                        collection: collection.collection,
                        tasks: collection.tasks.filter(
                            (task) => !task.isCompleted,
                        ),
                    }))
                    .filter((collection) => collection.tasks.length > 0);
            }),
        );
    }

    public arrayCollectToday$() {
        return this.arrayCollect$().pipe(
            map((collections) => {
                return collections
                    .map((collection) => ({
                        collection: collection.collection,
                        tasks: collection.tasks.filter(
                            (task) =>
                                task.endDate?.slice(0, 10) ===
                                this.dateFormatService.formatDate(this.date),
                        ),
                    }))
                    .filter((collection) => collection.tasks.length > 0);
            }),
        );
    }

    public arrayCollectWasted$() {
        return this.arrayCollect$().pipe(
            map((collections) => {
                return collections
                    .map((collection) => ({
                        collection: collection.collection,
                        tasks: collection.tasks.filter((task) => {
                            const endDate = task.endDate?.slice(0, 10);
                            return (
                                endDate &&
                                this.dateFormatService.convertor(endDate) <
                                    this.dateFormatService.formatWastedDate(
                                        this.date,
                                    )
                            );
                        }),
                    }))
                    .filter((collection) => collection.tasks.length > 0);
            }),
        );
    }
}
