import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserContextService } from '../../../auth/service/user-context.service';

@Component({
    selector: 'app-profile-modal',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
    constructor(
        private router: Router,
        private dialogRef: DialogRef<string>,
        private userContextService: UserContextService,
    ) {}

    ngOnInit() {}

    public currentUser$(): Observable<string> {
        return this.userContextService.getUserName$;
    }

    public onLogout() {
        sessionStorage.removeItem('authenticated');
        sessionStorage.removeItem('authenticatedUser');
        this.dialogRef.close();
        this.router.navigate(['/authorization']);
    }

    public onClose() {
        this.dialogRef.close();
    }
}
