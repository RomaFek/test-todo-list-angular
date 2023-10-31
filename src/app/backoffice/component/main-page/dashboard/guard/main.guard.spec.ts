import {TestBed} from '@angular/core/testing';
import {MainGuard} from './main.guard';
import {Router} from '@angular/router';

describe('MainGuard', () => {
    let guard: MainGuard;
    let router: jasmine.SpyObj<Router>;

    beforeEach(() => {
        const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        TestBed.configureTestingModule({
            providers: [
                MainGuard,
                {provide: Router, useValue: routerSpy},
            ],
        });

        guard = TestBed.inject(MainGuard);
        router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('should return true and not navigate when no token is found', () => {
        const canActivate = guard.canActivate();

        expect(canActivate).toBeTrue();
        expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should return false and navigate to the root when a token is found', () => {
        spyOn(sessionStorage, 'getItem').and.returnValue('token');

        const canActivate = guard.canActivate();

        expect(canActivate).toBeFalse();
        expect(router.navigate).toHaveBeenCalledWith(['']);
    });
});
