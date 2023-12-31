import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, takeUntil } from 'rxjs';
import { NavbarService } from '../../../navbar/services/navbar.service';
import { ITask } from '../../../shared/model/task-model';
import { DestroyService } from '../../../shared/service/destroy.service';
import { ModalService } from '../../../navbar/services/modal.service';
import { IndexedDBService } from '../../../shared/service/indexed-db.service';

@Component({
    selector: 'app-collection-page',
    templateUrl: './collection-page.component.html',
    styleUrls: ['./collection-page.component.scss'],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionPageComponent implements OnInit {
    public collection!: Observable<string>;
    public sidenavVisible$!: Observable<boolean>;
    private filterCollections!: string;

    constructor(
        private route: ActivatedRoute,
        private navbarService: NavbarService,
        private destroy$: DestroyService,
        private modalService: ModalService,
        private indexedDBService: IndexedDBService,
    ) {}

    public ngOnInit() {
        this.sidenavVisible$ = this.navbarService.sidenavVisible$;
        this.navbarService.openMenu();
        this.collection = this.route.params.pipe(
            map((param) => param['collectionTask']),
            takeUntil(this.destroy$),
        );
    }

    public onFilteredTruthy(): Observable<ITask[]> {
        this.collection.subscribe((v) => (this.filterCollections = v));
        return this.indexedDBService.allTasks.pipe(
            map((el) =>
                el.filter((el) => el.collectionTask === this.filterCollections),
            ),
            map((tasks) => tasks.filter((el) => el.isCompleted === false)),
        );
    }

    public onFilteredFalsy(): Observable<ITask[]> {
        this.collection.subscribe((v) => (this.filterCollections = v));
        return this.indexedDBService.allTasks.pipe(
            map((el) =>
                el.filter((el) => el.collectionTask === this.filterCollections),
            ),
            map((tasks) => tasks.filter((el) => el.isCompleted === true)),
        );
    }

    public goBack() {
        window.history.back();
    }

    public openModal() {
        this.modalService.openModal();
    }
}
