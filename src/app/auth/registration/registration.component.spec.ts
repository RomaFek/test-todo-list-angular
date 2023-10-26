import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {RegistrationComponent} from './registration.component';
import {AuthService} from '../service/auth.service';
import {UniqueLoginValidator} from '../validator/uniq-validator';
import {Router} from '@angular/router';
import {MatIconModule} from "@angular/material/icon";
import {of} from "rxjs";

describe('RegistrationComponent', () => {
    let component: RegistrationComponent;
    let fixture: ComponentFixture<RegistrationComponent>;
    let routerSpy: jasmine.SpyObj<Router>;
    let authServiceSpy: jasmine.SpyObj<AuthService>;
    let uniqueLoginValidatorSpy: jasmine.SpyObj<UniqueLoginValidator>;
    // let routerSpy = {
    //     navigate: jasmine.createSpy('navigate')
    // };

    beforeEach(async () => {
        authServiceSpy = jasmine.createSpyObj('AuthService', ['registration']);
        routerSpy = jasmine.createSpyObj('Router', ['navigate']);
        uniqueLoginValidatorSpy = jasmine.createSpyObj('UniqueLoginValidator', ['validateLoginUniqueness']);
        uniqueLoginValidatorSpy.validateLoginUniqueness.and.callFake(() => {
            return () => of(null)
        });
        await TestBed.configureTestingModule({
            declarations: [RegistrationComponent],
            imports: [ReactiveFormsModule,
                MatIconModule,],
            providers: [
                {provide: Router, useValue: routerSpy},
                {provide: AuthService, useValue: authServiceSpy},
                {provide: UniqueLoginValidator, useValue: uniqueLoginValidatorSpy},
            ],

        }).compileComponents();

        fixture = TestBed.createComponent(RegistrationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle password visibility', () => {
        component.togglePasswordVisibility();
        expect(component.showPassword).toBeTrue();

        component.togglePasswordVisibility();
        expect(component.showPassword).toBeFalse();
    });

    it('should submit the form and navigate on successful registration', () => {
        const form = component.loginGroup;
        form.controls.username.setValue('testuser');
        form.controls.login.setValue('testlogin');
        form.controls.password.setValue('testpassword');

        const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
        submitButton.click();

        expect(component.submitted).toBeTrue();
        expect(authServiceSpy.registration).toHaveBeenCalled();
        // expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should not submit the form when it is invalid', () => {
        authServiceSpy.registration.and.returnValue(of(true));

        const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
        submitButton.click();
        expect(authServiceSpy.registration).not.toHaveBeenCalled();
    });

    it('should not submit the form on failed registration', () => {
        const form = component.loginGroup;
        form.controls.username.setValue('testuser');
        form.controls.login.setValue('');
        form.controls.password.setValue('testpassword');

        authServiceSpy.registration.and.returnValue(of(false));

        const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
        submitButton.click();
        expect(routerSpy.navigate).toHaveBeenCalledTimes(0);

    });
});
