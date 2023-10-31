import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UniqCollectService } from '../backoffice/components/dashboard/services/uniq-collect.service';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
    constructor(private uniqCollectionService: UniqCollectService) {}

    public getUniqueCollections(): Observable<(string | null | undefined)[]> {
        return this.uniqCollectionService.getUniqueCollections();
    }
}
