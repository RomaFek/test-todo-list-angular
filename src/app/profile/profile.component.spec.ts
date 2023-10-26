import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ProfileComponent} from './profile.component';
import {DialogRef} from '@angular/cdk/dialog';
import {AuthService} from '../auth/service/auth.service';
import {Router} from '@angular/router';
import {MatIconModule} from "@angular/material/icon";

describe('ProfileComponent', () => {
    let component: ProfileComponent;
    let fixture: ComponentFixture<ProfileComponent>;
    let dialogRefSpy: jasmine.SpyObj<DialogRef>
    let authServiceSpy: jasmine.SpyObj<AuthService>;
    let routerSpy: jasmine.SpyObj<Router>;

    beforeEach(() => {
        dialogRefSpy = jasmine.createSpyObj('DialogRef', ['close']);
        routerSpy = jasmine.createSpyObj('Router', ['navigate']);
        TestBed.configureTestingModule({
            declarations: [ProfileComponent],
            providers: [
                {provide: AuthService, useValue: authServiceSpy},
                {provide: Router, useValue: routerSpy},
                {provide: DialogRef, useValue: dialogRefSpy},
            ],
            imports: [MatIconModule]
        });

        fixture = TestBed.createComponent(ProfileComponent);
        component = fixture.componentInstance;

    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set currentUser on ngOnInit', () => {
        const authenticatedUser = JSON.stringify('testUser');
        spyOn(sessionStorage, 'getItem').and.returnValue(authenticatedUser);

        fixture.detectChanges();

        expect(component.currentUser).toEqual('testUser');
    });

    it('should remove items from sessionStorage and navigate on logout', () => {
        spyOn(sessionStorage, 'removeItem').and.stub();


        fixture.detectChanges();

        component.onLogout();

        expect(sessionStorage.removeItem).toHaveBeenCalledWith('authenticated');
        expect(sessionStorage.removeItem).toHaveBeenCalledWith('authenticatedUser');
        expect(dialogRefSpy.close).toHaveBeenCalled();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/authorization']);
    });

    it('should close the dialog on close', () => {


        fixture.detectChanges();

        component.onClose();

        expect(dialogRefSpy.close).toHaveBeenCalled();
    });
});
