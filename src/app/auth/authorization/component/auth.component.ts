import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {DestroyService} from "../../../shared/destroy.service";
import {takeUntil} from "rxjs";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {
    public submitted = false;
    public showPassword: boolean = false;
    public loginGroup!: FormGroup<{
        login: FormControl<string | null>;
        password: FormControl<string | null>;
    }>

    constructor(private router: Router, private authService: AuthService, private destroy$: DestroyService) {
        this._createForm()
    }

    private _createForm() {
        this.loginGroup = new FormGroup({
            login: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        })
    }

    public togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    public onSubmit() {
        this.submitted = true
        const loginValue = this.loginGroup.controls.login.value;
        if (loginValue) {
            this.authService.loginUser(loginValue).pipe(
                // switchMap((el) => {
                //     return this.authService.setUsername(el)}),
                takeUntil(this.destroy$)).subscribe(user => {
                if (user) {
                    sessionStorage.setItem('authenticated', 'true');
                    // this.authService.registration(user).pipe(takeUntil(this.destroy$)).subscribe()
                    this.router.navigate(['/']);
                } else {
                    // this.notUser = true
                }
            });
        }
    }

}
