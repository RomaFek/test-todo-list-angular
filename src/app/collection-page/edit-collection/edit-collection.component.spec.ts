import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EditCollectionComponent } from './edit-collection.component';
import { CollectionArrayService } from '../../collections/add-collect-modal/service/collection-array.service';
import { CopyBDService } from '../../main-page/dashboard/services/copy-bd.service';
import { DestroyService } from '../../shared/service/destroy.service';
import { Observable } from 'rxjs';
import { ITask } from '../../shared/model/task-model';

describe('EditCollectionComponent', () => {
    let component: EditCollectionComponent;
    let fixture: ComponentFixture<EditCollectionComponent>;
    let collectionArrayServiceSpy: jasmine.SpyObj<CollectionArrayService>;
    let copyBDServiceSpy: jasmine.SpyObj<CopyBDService>;
    // const collectionArrayServiceStub = {
    //     collectionSubject$: of(['Collection1', 'Collection2']),
    // };
    //
    // const copyBDServiceStub = {
    //     updateTask: jasmine.createSpy('updateTask'),
    // };

    beforeEach(() => {
        copyBDServiceSpy = jasmine.createSpyObj('CopyBDService', [
            'updateTask',
        ]);
        TestBed.configureTestingModule({
            declarations: [EditCollectionComponent],
            providers: [
                {
                    provide: CollectionArrayService,
                    useValue: collectionArrayServiceSpy,
                },
                { provide: CopyBDService, useValue: copyBDServiceSpy },
                DestroyService,
            ],
            schemas: [NO_ERRORS_SCHEMA],
        });

        fixture = TestBed.createComponent(EditCollectionComponent);
        component = fixture.componentInstance;
        component.task = {
            id: 1,
            description: 'Task 1',
            collectionTask: 'Collection1',
            endDate: '2023-10-19T08:45:00',
            isCompleted: false,
        };
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize form control', () => {
        fixture.detectChanges();
        expect(component.changeTask).toBeTruthy();
    });

    it('should toggle edit mode and update task', () => {
        fixture.detectChanges();
        component.onEdit(component.task);
        expect(component.editCollect).toBe(true);

        copyBDServiceSpy.updateTask.and.returnValue(new Observable<ITask[]>());
        component.changeTask.setValue('Collection2');
        component.onEdit(component.task);
        expect(component.editCollect).toBe(false);
        expect(copyBDServiceSpy.updateTask).toHaveBeenCalledWith({
            ...component.task,
            collectionTask: 'Collection2',
        });
    });
});
