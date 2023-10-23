import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map, Observable, takeUntil} from "rxjs";
import {CopyBDService} from "../../main-page/dashboard/services/copy-bd.service";
import {NavbarService} from "../../navbar/services/navbar.service";
import {ITask} from "../../add-task/models/task-model";
import {FormControl} from "@angular/forms";
import {DestroyService} from "../../shared/destroy.service";
import {TaskCompleteService} from "../../main-page/card-task/service/task-complete.service";
import {ModalService} from "../../add-task/services/modal.service";

@Component({
    selector: 'app-collection-page',
    templateUrl: './collection-page.component.html',
    styleUrls: ['./collection-page.component.scss'],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionPageComponent implements OnInit {
    public collection!: string
    public tasksReady$!: Observable<ITask[]>;
    public tasksFalsy$!: Observable<ITask[]>;
    public sidenavVisible$!: Observable<boolean>
    public isCheckbox: FormControl<boolean>;


    constructor(
        private route: ActivatedRoute,
        private navbarService: NavbarService,
        private copyBDService: CopyBDService,
        private taskCompleteService: TaskCompleteService,
        private destroy$: DestroyService,
        private modalService: ModalService,
    ) {
        this.isCheckbox = new FormControl(true, {nonNullable: true})
    }

    public ngOnInit() {
        this.sidenavVisible$ = this.navbarService.sidenavVisible$;
        this.navbarService.openMenu()
        this.route.params.pipe(
            map(param => param['collectionTask']),
            takeUntil(this.destroy$)
        ).subscribe(task => {
            this.collection = task;
            this.tasksReady$ = this.copyBDService.allTasks.pipe(
                map(tasks => tasks.filter((el) => el.collectionTask === this.collection)),
                map(tasks => tasks.filter((el) => el.isCompleted === false)),
            );
        });
        this.route.params.pipe(
            map(param => param['collectionTask']),
            takeUntil(this.destroy$)
        ).subscribe(task => {
            this.collection = task;
            this.tasksFalsy$ = this.copyBDService.allTasks.pipe(
                map(tasks => tasks.filter((el) => el.collectionTask === this.collection)),
                map(tasks => tasks.filter((el) => el.isCompleted === true)),
            );
        });
        this.tasksFalsy$.pipe(map((el) => el.length))
        this.tasksReady$.pipe(map((el) => el.length))
    }

    public changeTaskCompleted(task: ITask) {
        this.taskCompleteService.changeTaskCompleted(task)
    }

    public goBack() {
        window.history.back();
    }

    public openDialog(): void {
        this.modalService.openModal();
    }


}

