import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DashboardComponent} from './dashboard.component';
import {NavbarService} from '../../../navbar/services/navbar.service';
import {CopyBDService} from '../services/copy-bd.service';
import {ModalService} from '../../../add-task/services/modal.service';
import {of} from 'rxjs';
import {NavbarComponent} from "../../../navbar/component/navbar.component";
import {MatIconModule} from "@angular/material/icon";

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let mockNavbarService: jasmine.SpyObj<NavbarService>;
    let mockCopyBDService: jasmine.SpyObj<CopyBDService>;
    let mockModalService: jasmine.SpyObj<ModalService>;

    beforeEach(() => {
        mockNavbarService = jasmine.createSpyObj('NavbarService', ['sidenavVisible$', 'openMenu']);
        mockNavbarService.sidenavVisible$ = of(true);

        mockCopyBDService = jasmine.createSpyObj('CopyBDService', ['allTasks']);
        // mockCopyBDService.allTasks = of([
        //     {id: 1, description: 'Task 1', endDate: '2023-10-30', collectionTask: 'Work', isCompleted: false},
        //     {id: 2, description: 'Task 2', endDate: '2023-10-31', collectionTask: 'Personal', isCompleted: true},
        // ] as ITask[]);

        mockModalService = jasmine.createSpyObj('ModalService', ['openProfile']);

        TestBed.configureTestingModule({
            declarations: [DashboardComponent, NavbarComponent],
            providers: [
                {provide: NavbarService, useValue: mockNavbarService},
                {provide: CopyBDService, useValue: mockCopyBDService},
                {provide: ModalService, useValue: mockModalService},
            ],
            imports: [MatIconModule]
        });

        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should open the profile modal', () => {
        component.openProfile();
        expect(mockModalService.openProfile).toHaveBeenCalled();
    });

    it('should show all tasks when showAll is called', () => {
        component.todayTaskVisible = true;
        component.wastedTaskVisible = true;

        component.showAll();

        expect(component.todayTaskVisible).toBeFalse();
        expect(component.wastedTaskVisible).toBeFalse();
    });

    it('should show today tasks when today is called', () => {
        component.todayTaskVisible = false;
        component.wastedTaskVisible = true;

        component.today();

        expect(component.todayTaskVisible).toBeTrue();
        expect(component.wastedTaskVisible).toBeFalse();
    });

    it('should show wasted tasks when wasted is called', () => {
        component.todayTaskVisible = true;
        component.wastedTaskVisible = false;

        component.wasted();

        expect(component.todayTaskVisible).toBeFalse();
        expect(component.wastedTaskVisible).toBeTrue();
    });

    it('should return a greeting based on the time', () => {

        jasmine.clock().mockDate(new Date('2023-10-30T08:00:00'));
        expect(component.whatsTime()).toBe('Good morning');


        jasmine.clock().mockDate(new Date('2023-10-30T15:00:00'));
        expect(component.whatsTime()).toBe('Good afternoon');


        jasmine.clock().mockDate(new Date('2023-10-30T19:00:00'));
        expect(component.whatsTime()).toBe('Good evening');


        jasmine.clock().mockDate(new Date('2023-10-30T23:00:00'));
        expect(component.whatsTime()).toBe('Good night');
    });
});
