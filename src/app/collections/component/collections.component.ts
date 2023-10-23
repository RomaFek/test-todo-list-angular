import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {CopyBDService} from "../../main-page/dashboard/services/copy-bd.service";
import {UniqCollectionService} from "../service/uniq-collection.service";
import {NavbarService} from "../../navbar/services/navbar.service";
import {combineLatest, map, Observable} from "rxjs";
import {ModalService} from "../../add-task/services/modal.service";

@Component({
    selector: 'app-collections',
    templateUrl: './collections.component.html',
    styleUrls: ['./collections.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionsComponent implements OnInit, OnDestroy {
    constructor(
        public copyBDService: CopyBDService,
        public uniqCollectionService: UniqCollectionService,
        private navbarService: NavbarService,
        private modalService: ModalService
    ) {
    }

    public ngOnInit() {
        this.navbarService.closeMenu()
        this.navbarService.onPage()
    }

    public quantity$(collection: string): Observable<string> {
        return combineLatest([
            this.copyBDService.allTasks.pipe(
                map((el) => el.filter((el) => el.collectionTask === collection)),
                map((el) => el.length)
            ),
            this.copyBDService.allTasks.pipe(
                map((el) => el.filter((el) => el.collectionTask === collection)),
                map((el) => el.filter((el) => el.isCompleted)),
                map((el) => el.length)
            )
        ]).pipe(
            map(([allTasksCount, readyTasksCount]) => `${readyTasksCount}/${allTasksCount} done`)
        );
    }

    public addCollection() {
        this.modalService.openAddCollect()
    }

    public ngOnDestroy() {
        this.navbarService.leaveOnPage()
    }
}
