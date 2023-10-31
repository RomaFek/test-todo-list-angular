import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavbarService } from './services/navbar.service';
import { Observable, take } from 'rxjs';
import { ModalService } from './services/modal.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
    public sidenavVisible$!: Observable<boolean>;
    public lighting$!: Observable<boolean>;
    public menuVisible$!: Observable<boolean>;

    constructor(
        private navbarService: NavbarService,
        private modalService: ModalService,
    ) {}

    public ngOnInit() {
        this.sidenavVisible$ = this.navbarService.sidenavVisible$;
        this.lighting$ = this.navbarService.btnLighting$;
        this.menuVisible$ = this.navbarService.menuVisible$;
    }

    public toggleSidenav() {
        this.sidenavVisible$.pipe(take(1)).subscribe((isVisible) => {
            if (isVisible) {
                this.navbarService.closeSidenav();
            } else {
                this.navbarService.openSidenav();
            }
        });
    }

    public openModal(): void {
        this.modalService.openModal();
    }

    public openProfile() {
        this.modalService.openProfile();
    }
}
