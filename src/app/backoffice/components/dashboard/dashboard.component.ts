import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavbarService } from '../../../navbar/services/navbar.service';
import { ModalService } from '../../../navbar/services/modal.service';
import { UserContextService } from '../../../auth/service/user-context.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
    public sidenavVisible$!: Observable<boolean>;
    public date = new Date();

    // public currentUser$!: Observable<string>;

    constructor(
        private navbarService: NavbarService,
        private userContextService: UserContextService,
        private modalService: ModalService,
    ) {
        // this.currentUser$ = this.userContextService.getUserName$;
    }

    public ngOnInit() {
        this.sidenavVisible$ = this.navbarService.sidenavVisible$;
        this.navbarService.openMenu();
    }

    public currentUser$(): Observable<string> {
        return this.userContextService.getUserName$;
    }

    public openProfile() {
        this.modalService.openProfile();
    }
}
