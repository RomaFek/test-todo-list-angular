import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {UniqueLoginValidator} from './uniq-validator';
import {AuthService} from '../service/auth.service';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';

describe('UniqueLoginValidator', () => {
    let validator: UniqueLoginValidator;
    let authServiceSpy: jasmine.SpyObj<AuthService>;
    let control: FormControl;

    beforeEach(() => {
        authServiceSpy = jasmine.createSpyObj('AuthService', ['loginUser']);
        authServiceSpy.loginUser.and.returnValue(undefined)

        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            providers: [
                UniqueLoginValidator,
                {provide: AuthService, useValue: authServiceSpy},
            ],
        });

        validator = TestBed.inject(UniqueLoginValidator);
        control = new FormControl('', [
            Validators.required,
            Validators.minLength(4),
        ], [validator.validateLoginUniqueness()])
    });

    it('should return null for a unique login', fakeAsync(() => {
        control.setValue('uniqueLogin');
        tick(300);

        expect(control.value).toBe('uniqueLogin');
    }));

});

