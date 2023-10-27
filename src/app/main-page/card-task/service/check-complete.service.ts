import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { DateFormatService } from '../../dashboard/services/date-format.service';
import { ITask } from '../../../add-task/models/task-model';

@Injectable({
    providedIn: 'root',
})
export class CheckCompleteService {
    private DateNow: Date = new Date();

    constructor(private dateFormatService: DateFormatService) {}

    // public isNotCompletedColl(arrCol: Observable<ITask[] | null | undefined>) {
    //     return arrCol.pipe(
    //         map((el) => (el ? el.filter((task) => !task.isCompleted) : [])),
    //         filter((el) => el.length > 0),
    //     );
    // }

    public isNotCompletedCollWasted(arrCol: Observable<ITask[] | null>) {
        return arrCol.pipe(
            map((el) => (el ? el.filter((task) => !task.isCompleted) : [])),
            filter((el) => el.length > 0),
            map((el) =>
                el.filter((el) => {
                    const endDate = el.endDate?.slice(0, 10);
                    return (
                        endDate &&
                        this.dateFormatService.convertor(endDate) <
                            this.dateFormatService.formatWastedDate(
                                this.DateNow,
                            )
                    );
                }),
            ),
        );
    }

    public isNotCompletedCollToday(
        arrCol: Observable<ITask[] | null | undefined>,
    ): Observable<ITask[] | null> {
        return arrCol.pipe(
            map((el) => (el ? el.filter((task) => !task.isCompleted) : [])),
            filter((el) => el.length > 0),
            map((el) =>
                el.filter(
                    (el) =>
                        el.endDate?.slice(0, 10) ===
                        this.dateFormatService.formatDate(this.DateNow),
                ),
            ),
        );
    }
}
