import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DestroyService } from '../../../shared/service/destroy.service';
import { takeUntil } from 'rxjs';
import { CheckValidService } from '../../service/check-valid.service';
import { IndexedDBService } from '../../../service/indexed-db.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
    public submitted = false;
    public showPassword: boolean = false;
    public authMode!: string;
    public loginGroup!: FormGroup<{
        login: FormControl<string | null>;
        password: FormControl<string | null>;
    }>;

    constructor(
        private router: Router,
        private destroy$: DestroyService,
        private checkValidService: CheckValidService,
        private indexedDBService: IndexedDBService,
    ) {
        this._createForm();
    }

    private _createForm() {
        this.loginGroup = new FormGroup({
            login: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
        });
    }

    public togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    public onSubmit(event: Event) {
        event.preventDefault();
        this.submitted = true;

        const loginValue = this.loginGroup.controls.login.value;
        if (loginValue) {
            this.indexedDBService
                .loginUser(loginValue)
                ?.pipe(takeUntil(this.destroy$))
                .subscribe((user) => {
                    if (user) {
                        sessionStorage.setItem('authenticated', 'true');
                        this.router.navigate(['/']);
                    }
                });
        }
    }

    public switchMode(newMode: 'login' | 'register') {
        this.authMode = newMode;
    }

    public getErrorMessage(submitted: boolean, controls: FormControl) {
        return this.checkValidService.getErrorMessage(submitted, controls);
    }
}
