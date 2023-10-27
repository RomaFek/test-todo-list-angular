import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CopyBDService } from './copy-bd.service';
import { DateFormatService } from './date-format.service';

@Injectable({
    providedIn: 'root',
})
export class SeparationTasksService {
    private DateNow: Date = new Date();

    constructor(
        private copyBDService: CopyBDService,
        private dateFormatService: DateFormatService,
    ) {}

    public wastedTask$ = this.copyBDService.allTasks.pipe(
        map((el) =>
            el.filter((el) => {
                const endDate = el.endDate?.slice(0, 10);
                return (
                    endDate &&
                    this.dateFormatService.convertor(endDate) <
                        this.dateFormatService.formatWastedDate(this.DateNow)
                );
            }),
        ),
        map((el) => el.filter((el) => !el.isCompleted)),
        map((el) => el.map((el) => el.collectionTask)),
        map((collection) => Array.from(new Set(collection))),
    );

    public todayTask$ = this.copyBDService.allTasks.pipe(
        map((el) =>
            el.filter(
                (el) =>
                    el.endDate?.slice(0, 10) ===
                    this.dateFormatService.formatDate(this.DateNow),
            ),
        ),
        map((el) => el.map((el) => el.collectionTask)),
        map((collection) => Array.from(new Set(collection))),
    );
}
