import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, takeUntil } from 'rxjs';
import { CopyBDService } from '../../main-page/dashboard/services/copy-bd.service';
import { NavbarService } from '../../navbar/services/navbar.service';
import { ITask } from '../../add-task/models/task-model';
import { FormControl } from '@angular/forms';
import { DestroyService } from '../../shared/destroy.service';
import { TaskCompleteService } from '../../main-page/card-task/service/task-complete.service';
import { ModalService } from '../../add-task/services/modal.service';

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
    public isCheckbox: FormControl<boolean>;

    constructor(
        private route: ActivatedRoute,
        private navbarService: NavbarService,
        private copyBDService: CopyBDService,
        public taskCompleteService: TaskCompleteService,
        private destroy$: DestroyService,
        public modalService: ModalService,
    ) {
        this.isCheckbox = new FormControl(true, { nonNullable: true });
    }

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
        return this.copyBDService.allTasks.pipe(
            map((el) =>
                el.filter((el) => el.collectionTask === this.collection),
            ),
            map((tasks) => tasks.filter((el) => el.isCompleted === false)),
        );
    }

    public onFilteredFalsy(): Observable<ITask[]> {
        return this.copyBDService.allTasks.pipe(
            map((el) =>
                el.filter((el) => el.collectionTask === this.collection),
            ),
            map((tasks) => tasks.filter((el) => el.isCompleted === true)),
        );
    }

    public goBack() {
        window.history.back();
    }
}
