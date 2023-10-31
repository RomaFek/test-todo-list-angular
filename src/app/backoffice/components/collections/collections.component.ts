import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { NavbarService } from '../../../navbar/services/navbar.service';
import { combineLatest, map, Observable } from 'rxjs';
import { ModalService } from '../../../navbar/services/modal.service';
import { UniqCollectService } from '../dashboard/services/uniq-collect.service';
import { IndexedDBService } from '../../../shared/service/indexed-db.service';

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
        private indexedDBService: IndexedDBService,
    ) {}

    public ngOnInit() {
        this.arrayCollections$ =
            this.uniqCollectionService.getUniqueCollections();
        this.navbarService.closeMenu();
        this.navbarService.onPage();
        this.navbarService.closeSidenav();
    }

    public quantity$(collection: string): Observable<string> {
        return combineLatest([
            this.indexedDBService.allTasks.pipe(
                map((el) =>
                    el.filter((el) => el.collectionTask === collection),
                ),
                map((el) => el.length),
            ),
            this.indexedDBService.allTasks.pipe(
                map((el) =>
                    el.filter((el) => el.collectionTask === collection),
                ),
                map((el) => el.filter((el) => el.isCompleted)),
                map((el) => el.length),
            ),
        ]).pipe(
            map(
                ([allTasksCount, readyTasksCount]) =>
                    `${readyTasksCount}/${allTasksCount} done`,
            ),
        );
    }

    public openAddCollect() {
        return this.modalService.openAddCollect();
    }

    public ngOnDestroy() {
        this.navbarService.leaveOnPage();
    }
}
