import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { IUser } from '../../../shared/model/user-model';

describe('AuthComponent', () => {
    let component: AuthComponent;
    let fixture: ComponentFixture<AuthComponent>;
    let routerSpy: jasmine.SpyObj<Router>;
    let authServiceSpy: jasmine.SpyObj<AuthService>;
    window.sessionStorage.setItem = jasmine.createSpy();
    beforeEach(async () => {
        authServiceSpy = jasmine.createSpyObj('AuthService', ['loginUser']);
        routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
            declarations: [AuthComponent],
            imports: [ReactiveFormsModule, MatIconModule],
            providers: [
                { provide: Router, useValue: routerSpy },
                { provide: AuthService, useValue: authServiceSpy },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AuthComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call onSubmit method', () => {
        component.loginGroup.controls.login.setValue('testLogin');
        component.loginGroup.controls.password.setValue('testPassword');

        const submitButton = fixture.nativeElement.querySelector(
            'button[type="submit"]',
        );
        submitButton.click();

        expect(component.submitted).toBeTrue();
        expect(authServiceSpy.loginUser).toHaveBeenCalled();
    });

    it('should set "authenticated" in sessionStorage when user is authenticated', () => {
        authServiceSpy.loginUser.and.returnValue(new Observable<IUser>());

        const submitButton = fixture.nativeElement.querySelector(
            'button[type="submit"]',
        );
        submitButton.click();
        window.sessionStorage.setItem('authenticated', 'true');
        expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
            'authenticated',
            'true',
        );
    });
});
