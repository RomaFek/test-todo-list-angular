import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { UniqCollectionService } from '../service/uniq-collection.service';
import { NavbarService } from '../../navbar/services/navbar.service';
import { map, Observable, switchMap } from 'rxjs';
import { ModalService } from '../../add-task/services/modal.service';
import { FilteredTasksCompletedService } from '../service/filtered-tasks-completed.service';

@Component({
    selector: 'app-collections',
    templateUrl: './collections.component.html',
    styleUrls: ['./collections.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionsComponent implements OnInit, OnDestroy {
    constructor(
        private uniqCollectionService: UniqCollectionService,
        private navbarService: NavbarService,
        private modalService: ModalService,
        private filteredTasksCompletedService: FilteredTasksCompletedService,
    ) {}

    public ngOnInit() {
        this.navbarService.closeMenu();
        this.navbarService.onPage();
    }

    public quantity$(collection: string): Observable<string> {
        return this.filteredTasksCompletedService
            .totalTasksCount$(collection)
            .pipe(
                switchMap((total) => {
                    return this.filteredTasksCompletedService
                        .completedTasksCount$(collection)
                        .pipe(map((completed) => `${completed}/${total} done`));
                }),
            );
    }

    public ngOnDestroy() {
        this.navbarService.leaveOnPage();
    }

    public openAddCollect() {
        return this.modalService.openAddCollect();
    }

    public getUniqueCollectionTasks() {
        return this.uniqCollectionService.getUniqueCollections();
    }
}
