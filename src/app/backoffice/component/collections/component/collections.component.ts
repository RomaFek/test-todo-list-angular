import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { NavbarService } from '../../../../navbar/services/navbar.service';
import { map, Observable, switchMap } from 'rxjs';
import { ModalService } from '../../../../navbar/add-task/services/modal.service';
import { FilteredTasksCompletedService } from '../service/filtered-tasks-completed.service';
import { UniqCollectService } from '../../main-page/dashboard/services/uniq-collect.service';

@Component({
    selector: 'app-collections',
    templateUrl: './collections.component.html',
    styleUrls: ['./collections.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionsComponent implements OnInit, OnDestroy {
    public arrayCollections$:
        | Observable<(string | null | undefined)[]>
        | undefined;

    constructor(
        private uniqCollectionService: UniqCollectService,
        private navbarService: NavbarService,
        private modalService: ModalService,
        private filteredTasksCompletedService: FilteredTasksCompletedService,
    ) {}

    public ngOnInit() {
        this.arrayCollections$ =
            this.uniqCollectionService.getUniqueCollections();
        this.navbarService.closeMenu();
        this.navbarService.onPage();
        this.navbarService.closeSidenav();
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

    public openAddCollect() {
        return this.modalService.openAddCollect();
    }

    // public getUniqueCollectionTasks() {
    //     this.arrayCollections$ =
    //         this.uniqCollectionService.getUniqueCollections();
    // }

    public ngOnDestroy() {
        this.navbarService.leaveOnPage();
    }
}
