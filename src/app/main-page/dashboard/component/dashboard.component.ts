import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavbarService } from '../../../navbar/services/navbar.service';
import { ModalService } from '../../../add-task/services/modal.service';
import { UserContextService } from '../../../auth/service/user-context.service';
import { IndexedDBService } from '../../../service/indexed-db.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
    public sidenavVisible$!: Observable<boolean>;
    public date = new Date();

    constructor(
        private navbarService: NavbarService,
        private userContextService: UserContextService,
        private modalService: ModalService,
        private indexedDBService: IndexedDBService,
    ) {}

    public ngOnInit() {
        this.sidenavVisible$ = this.navbarService.sidenavVisible$;
        this.navbarService.openMenu();
    }

    public currentUser$(): Observable<string> {
        return this.userContextService.authenticatedUser$;
    }

    public openProfile() {
        this.modalService.openProfile();
    }
}
