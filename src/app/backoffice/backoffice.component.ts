import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NavbarService } from '../navbar/services/navbar.service';

@Component({
    selector: 'app-backoffice',
    templateUrl: './backoffice.component.html',
    styleUrls: ['./backoffice.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackofficeComponent {
    public sidenavVisible$!: Observable<boolean>;

    constructor(private navbarService: NavbarService) {
        this.sidenavVisible$ = this.navbarService.sidenavVisible$;
    }
}
