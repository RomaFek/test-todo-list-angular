import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DialogRef} from "@angular/cdk/dialog";
import {AuthService} from "../auth/service/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
    public currentUser!: string

    constructor(
        private router: Router, public dialogRef: DialogRef<string>, public authService: AuthService
    ) {
    }

    ngOnInit() {
        const authenticatedUser = sessionStorage.getItem('authenticatedUser');
        if (authenticatedUser) {
            this.currentUser = JSON.parse(authenticatedUser);
        }
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
