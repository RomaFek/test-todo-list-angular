import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {AuthGuard} from './auth.guard';

describe('AuthGuard', () => {
    let guard: AuthGuard;
    let router: Router;
    let canActivateSpy: jasmine.Spy;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [AuthGuard],
        });

        guard = TestBed.inject(AuthGuard);
        router = TestBed.inject(Router);
        canActivateSpy = spyOn(guard, 'canActivate').and.callThrough();
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('should allow navigation when authenticated', () => {
        spyOn(sessionStorage, 'getItem').and.returnValue('authenticated');

        const result = guard.canActivate();

        expect(result).toBe(true);
        expect(canActivateSpy).toHaveBeenCalled();
    });

    it('should navigate to "authorization" route when not authenticated', () => {
        spyOn(sessionStorage, 'getItem').and.returnValue(null);
        const routerNavigateSpy = spyOn(router, 'navigate');

        const result = guard.canActivate();

        expect(result).toBe(false);
        expect(canActivateSpy).toHaveBeenCalled();
        expect(routerNavigateSpy).toHaveBeenCalledWith(['authorization']);
    });
});
