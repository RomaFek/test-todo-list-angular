import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthService} from './auth.service';
import {IUser} from '../model/user-model';

describe('Сервис AuthService', () => {
    let authService: AuthService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService]
        });

        authService = TestBed.inject(AuthService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should create', () => {
        expect(authService).toBeTruthy();
    });

    it('should register the user', () => {
        const user: IUser = {id: 1, username: 'testUser', login: 'testLogin', password: 'testPassword'};

        authService.registration(user).subscribe(response => {
            expect(response).toBeTruthy();
            expect(response).toEqual(user);
        });

        const req = httpTestingController.expectOne('addUser');
        expect(req.request.method).toEqual('POST');
        req.flush(user);
    });

    // it('should user be logged in', () => {
    //     const userLogin = 'testLogin';
    //     const userInDB: IUser = {id: 1, username: 'testUser', login: userLogin, password: 'testPassword'};
    //
    //
    //     authService.loginUser(userLogin).subscribe(user => {
    //         expect(user).toBeTruthy();
    //         expect(user.login).toEqual(userLogin);
    //     });
    // });
});
