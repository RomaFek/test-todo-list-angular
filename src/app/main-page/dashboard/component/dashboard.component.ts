import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavbarService } from '../../../navbar/services/navbar.service';
import { CopyBDService } from '../services/copy-bd.service';
import { ModalService } from '../../../add-task/services/modal.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
    public sidenavVisible$!: Observable<boolean>;
    private authenticatedUserSubject: BehaviorSubject<string> =
        new BehaviorSubject<string>('');

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
        this.navbarService.openMenu();
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
}
