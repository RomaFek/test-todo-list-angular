import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DestroyService } from '../shared/service/destroy.service';
import { takeUntil } from 'rxjs';
import { CheckValidService } from './service/check-valid.service';
import { IndexedDBService } from '../shared/service/indexed-db.service';
import { UniqueLoginValidator } from './validator/uniq-validator';

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
    public authMode: string = 'login';
    public loginGroup!: FormGroup<{
        login: FormControl<string | null>;
        password: FormControl<string | null>;
    }>;
    public registerGroup!: FormGroup<{
        username: FormControl<string | null>;
        login: FormControl<string | null>;
        password: FormControl<string | null>;
    }>;

    constructor(
        private router: Router,
        private destroy$: DestroyService,
        private checkValidService: CheckValidService,
        private indexedDBService: IndexedDBService,
        private uniqueLoginValidator: UniqueLoginValidator,
    ) {
        this._createFormLogin();
        this._createFormRegistration();
        this.indexedDBService
            .initDBUsers()
            .pipe(takeUntil(this.destroy$))
            .subscribe();
    }

    private _createFormLogin() {
        this.loginGroup = new FormGroup({
            login: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
        });
    }

    private _createFormRegistration() {
        this.registerGroup = new FormGroup({
            username: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
            ]),
            login: new FormControl(
                '',
                [Validators.required, Validators.minLength(3)],
                [this.uniqueLoginValidator.validateLoginUniqueness()],
            ),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
            ]),
        });
    }

    public togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    public onSubmitLogin(event: Event) {
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

    public onSubmitRegistration(event: Event) {
        event.preventDefault();
        this.submitted = true;
        if (this.registerGroup.valid) {
            const user = {
                id: Date.now(),
                username: this.registerGroup.controls.username.value,
                login: this.registerGroup.controls.login.value,
                password: this.registerGroup.controls.password.value,
            };
            this.indexedDBService
                .registration(user)
                .pipe(takeUntil(this.destroy$))
                .subscribe();
            this.router.navigate(['/']);
        }
    }

    public switchMode(newMode: 'login' | 'register') {
        this.authMode = newMode;
    }

    public getErrorMessage(submitted: boolean, controls: FormControl) {
        return this.checkValidService.getErrorMessage(submitted, controls);
    }
}
