import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, takeUntil } from 'rxjs';
import { CopyBDService } from '../../main-page/dashboard/services/copy-bd.service';
import { NavbarService } from '../../navbar/services/navbar.service';
import { ITask } from '../../add-task/models/task-model';
import { DestroyService } from '../../shared/destroy.service';
import { ModalService } from '../../add-task/services/modal.service';
import { IndexedDBService } from '../../service/indexed-db.service';

@Component({
    selector: 'app-collection-page',
    templateUrl: './collection-page.component.html',
    styleUrls: ['./collection-page.component.scss'],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionPageComponent implements OnInit {
    public collection!: string;
    public sidenavVisible$!: Observable<boolean>;

    constructor(
        private route: ActivatedRoute,
        private navbarService: NavbarService,
        private copyBDService: CopyBDService,
        private destroy$: DestroyService,
        private modalService: ModalService,
        private indexedDBService: IndexedDBService,
    ) {}

    public ngOnInit() {
        this.sidenavVisible$ = this.navbarService.sidenavVisible$;
        this.navbarService.openMenu();
        this.route.params
            .pipe(
                map((param) => param['collectionTask']),
                takeUntil(this.destroy$),
            )
            .subscribe((task) => {
                this.collection = task;
            });
    }

    public onFilteredTruthy(): Observable<ITask[]> {
        return this.indexedDBService.initDBTasks().pipe(
            map((el) =>
                el.filter((el) => el.collectionTask === this.collection),
            ),
            map((tasks) => tasks.filter((el) => el.isCompleted === false)),
        );
    }

    public onFilteredFalsy(): Observable<ITask[]> {
        return this.indexedDBService.initDBTasks().pipe(
            map((el) =>
                el.filter((el) => el.collectionTask === this.collection),
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
