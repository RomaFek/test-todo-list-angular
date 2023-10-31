import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollectionPageComponent } from './collection-page.component';
import { NavbarService } from '../../../navbar/services/navbar.service';
import { ActivatedRoute } from '@angular/router';
import { CopyBDService } from '../../backoffice/components/dashboard/dashboard/services/copy-bd.service';
import { TaskCompleteService } from '../dashboard/components/card-task/service/task-complete.service';
import { ModalService } from '../../../navbar/services/modal.service';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';

describe('CollectionPageComponent', () => {
    let component: CollectionPageComponent;
    let fixture: ComponentFixture<CollectionPageComponent>;
    let navbarServiceSpy: jasmine.SpyObj<NavbarService>;
    let copyBDServiceSpy: jasmine.SpyObj<CopyBDService>;
    let taskCompleteServiceSpy: jasmine.SpyObj<TaskCompleteService>;
    let modalServiceSpy: jasmine.SpyObj<ModalService>;
    let ActivatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;

    beforeEach(() => {
        navbarServiceSpy = jasmine.createSpyObj('NavbarService', [
            'sidenavVisible$',
            'openMenu',
        ]);
        copyBDServiceSpy = jasmine.createSpyObj('CopyBDService', ['allTasks']);
        taskCompleteServiceSpy = jasmine.createSpyObj('TaskCompleteService', [
            'changeTaskCompleted',
        ]);
        modalServiceSpy = jasmine.createSpyObj('ModalService', ['openModal']);
        ActivatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['params']);
        // let mockActivatedRoute = {
        //     snapshot: {
        //         paramMap: convertToParamMap({collectionTask: 'Test Collection'})
        //     }
        // };
        TestBed.configureTestingModule({
            declarations: [CollectionPageComponent, NavbarComponent],
            providers: [
                { provide: ActivatedRoute, useValue: ActivatedRouteSpy },
                { provide: CopyBDService, useValue: copyBDServiceSpy },
                {
                    provide: TaskCompleteService,
                    useValue: taskCompleteServiceSpy,
                },
                { provide: ModalService, useValue: modalServiceSpy },
                { provide: NavbarService, useValue: navbarServiceSpy },
            ],
            imports: [MatIconModule],
        });

        fixture = TestBed.createComponent(CollectionPageComponent);
        component = fixture.componentInstance;
        // fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // it('should initialize collection and tasks', () => {
    //     expect(components.collection).toBe('Test Collection');
    //     expect(components.onFiltredTruthy).toBeTruthy();
    //     expect(components.onFiltredFalsy).toBeTruthy();
    // });

    // it('should open a modal dialog', () => {
    //     fixture.detectChanges();
    //     components.openDialog();
    //     expect(modalServiceSpy.openModal).toHaveBeenCalled();
    // });
});
