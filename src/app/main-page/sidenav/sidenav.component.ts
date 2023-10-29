import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UniqCollectionService } from '../../collections/service/uniq-collection.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
    constructor(private uniqCollectionService: UniqCollectionService) {}

    public getUniqueCollections(): Observable<(string | null | undefined)[]> {
        return this.uniqCollectionService.getUniqueCollections();
    }
}
