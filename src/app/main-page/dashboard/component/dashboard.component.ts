import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {NavbarService} from "../../../navbar/services/navbar.service";
import {CopyBDService} from "../services/copy-bd.service";
import {ITask} from "../../../add-task/models/task-model";
import {ModalService} from "../../../add-task/services/modal.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
    public sidenavVisible$!: Observable<boolean>
    public todayTaskVisible: boolean = false
    public wastedTaskVisible: boolean = false
    public todayTask$!: Observable<(string | null)[]>
    public wastedTask$!: Observable<(string | null)[]>
    public DateNow: Date = new Date()
    private authenticatedUserSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');


    constructor(
        private navbarService: NavbarService,
        public copyBDService: CopyBDService,
        public modalService: ModalService,
    ) {
        const user = this.authenticatedUser();
        if (user) {
            this.authenticatedUserSubject.next(user);
        }
    }


    public ngOnInit() {

        this.sidenavVisible$ = this.navbarService.sidenavVisible$;
        this.todayTask$ = this.copyBDService.allTasks.pipe(
            map((el) => el.filter((el) => el.endDate?.slice(0, 10) === this.formatDate(this.DateNow))
            ),
            map(el => el.map((el) => el.collectionTask)),
            map(collection => Array.from(new Set(collection))))

        this.wastedTask$ =
            this.copyBDService.allTasks.pipe(
                map((el) => el.filter((el) => {
                    const endDate = el.endDate?.slice(0, 10);
                    return endDate && this.convertor(endDate) < this.formatWastedDate(this.DateNow);
                })),
                map((el) => el.filter(el => !el.isCompleted)),
                map(el => el.map((el) => el.collectionTask)),
                map(collection => Array.from(new Set(collection))))
        this.navbarService.openMenu()
        this.copyBDService.allTasks

    }

    public currentUser(): Observable<string> {

        return this.authenticatedUserSubject.asObservable();

    }

    public authenticatedUser() {
        let user = sessionStorage.getItem('authenticatedUser');
        if (user) {
            return JSON.parse(user);
        }
    }

    public collectionArr$(collection: string | null): Observable<ITask[]> {
        return this.copyBDService.allTasks.pipe(
            map((el) => el.filter((el) => el.collectionTask === collection)),
        )
    }

    public openProfile() {
        this.modalService.openProfile();
    }

    public uniqCollect() {
        return this.copyBDService.allTasks.pipe(
            map(el => el.map((el) => el.collectionTask)),
            map(collection => Array.from(new Set(collection))),
        )
    }

    public showAll() {
        this.todayTaskVisible = false
        this.wastedTaskVisible = false
    }

    public today() {
        this.todayTaskVisible = true
        this.wastedTaskVisible = false
    }

    public wasted() {
        this.wastedTaskVisible = true
        this.todayTaskVisible = false
    }

    public whatsTime(): string {
        const now = new Date();
        const hours = now.getHours();

        let greeting: string;

        if (hours >= 5 && hours < 12) {
            greeting = "Good morning";
        } else if (hours >= 12 && hours < 17) {
            greeting = "Good afternoon";
        } else if (hours >= 17 && hours < 22) {
            greeting = "Good evening";
        } else {
            greeting = "Good night";
        }

        return greeting;
    }

    private formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    private formatWastedDate(date: Date): number {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return Number(`${year}${month}${day}`);
    }

    private convertor(str: string): number {
        const numericStr = str.replace(/-/g, '');
        return Number(numericStr);
    }
}
