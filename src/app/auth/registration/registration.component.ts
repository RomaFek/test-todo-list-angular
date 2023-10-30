import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { DestroyService } from '../../shared/service/destroy.service';
import { UniqueLoginValidator } from '../validator/uniq-validator';
import { CheckValidService } from '../service/check-valid.service';
import { IndexedDBService } from '../../service/indexed-db.service';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss'],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {
    public showPassword: boolean = false;
    public submitted = false;
    public loginGroup!: FormGroup<{
        username: FormControl<string | null>;
        login: FormControl<string | null>;
        password: FormControl<string | null>;
    }>;

    constructor(
        private router: Router,
        private destroy$: DestroyService,
        private uniqueLoginValidator: UniqueLoginValidator,
        private indexedDBService: IndexedDBService,
        private checkValidService: CheckValidService,
    ) {
        this._createForm();
    }

    private _createForm() {
        this.loginGroup = new FormGroup({
            username: new FormControl('', [
                Validators.required,
                Validators.minLength(4),
            ]),
            login: new FormControl(
                '',
                [Validators.required, Validators.minLength(4)],
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

    public onSubmit(event: Event) {
        event.preventDefault();
        this.submitted = true;
        if (this.loginGroup.valid) {
            const user = {
                id: Date.now(),
                username: this.loginGroup.controls.username.value,
                login: this.loginGroup.controls.login.value,
                password: this.loginGroup.controls.password.value,
            };
            this.indexedDBService
                .registration(user)
                .pipe(takeUntil(this.destroy$))
                .subscribe();
            this.router.navigate(['/']);
        }
    }

    public getErrorMessage(submitted: boolean, controls: FormControl) {
        return this.checkValidService.getErrorMessage(submitted, controls);
    }
}
