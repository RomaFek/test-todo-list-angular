import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { NavbarService } from '../../../navbar/services/navbar.service';
import { CopyBDService } from '../services/copy-bd.service';
import { ModalService } from '../../../add-task/services/modal.service';
import { of } from 'rxjs';
import { NavbarComponent } from '../../../navbar/component/navbar.component';
import { MatIconModule } from '@angular/material/icon';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let mockNavbarService: jasmine.SpyObj<NavbarService>;
    let mockCopyBDService: jasmine.SpyObj<CopyBDService>;
    let mockModalService: jasmine.SpyObj<ModalService>;

    beforeEach(() => {
        mockNavbarService = jasmine.createSpyObj('NavbarService', [
            'sidenavVisible$',
            'openMenu',
        ]);
        mockNavbarService.sidenavVisible$ = of(true);

        mockCopyBDService = jasmine.createSpyObj('CopyBDService', ['allTasks']);
        // mockCopyBDService.allTasks = of([
        //     {id: 1, description: 'Task 1', endDate: '2023-10-30', collectionTask: 'Work', isCompleted: false},
        //     {id: 2, description: 'Task 2', endDate: '2023-10-31', collectionTask: 'Personal', isCompleted: true},
        // ] as ITask[]);

        mockModalService = jasmine.createSpyObj('ModalService', [
            'openProfile',
        ]);

        TestBed.configureTestingModule({
            declarations: [DashboardComponent, NavbarComponent],
            providers: [
                { provide: NavbarService, useValue: mockNavbarService },
                { provide: CopyBDService, useValue: mockCopyBDService },
                { provide: ModalService, useValue: mockModalService },
            ],
            imports: [MatIconModule],
        });

        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
