import { AddTaskComponent } from './add-task.component';
import { CopyBDService } from '../../main-page/dashboard/services/copy-bd.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogRef } from '@angular/cdk/dialog';
import { CollectionArrayService } from '../../collections/add-collect-modal/service/collection-array.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ITask } from '../../shared/model/task-model';

const mockData: ITask = {
    id: 1,
    description: 'Test task',
    collectionTask: 'Test Collection',
    endDate: '2023-12-31T23:59',
    isCompleted: false,
};
describe('AddTaskComponent', () => {
    let component: AddTaskComponent;
    let fixture: ComponentFixture<AddTaskComponent>;
    let CopyBDServiceSpy: jasmine.SpyObj<CopyBDService>;
    let DialogRefSpy: jasmine.SpyObj<DialogRef>;
    let CollectionArrayServiceSpy: jasmine.SpyObj<CollectionArrayService>;

    beforeEach(async () => {
        CopyBDServiceSpy = jasmine.createSpyObj('CopyBDService', ['addTasks']);
        CollectionArrayServiceSpy = jasmine.createSpyObj(
            'CollectionArrayService',
            ['http'],
        );
        DialogRefSpy = jasmine.createSpyObj('DialogRef', ['close']);
        await TestBed.configureTestingModule({
            declarations: [AddTaskComponent],
            providers: [
                { provide: CopyBDService, useValue: CopyBDServiceSpy },
                { provide: DialogRef<string>, useValue: DialogRefSpy },
                {
                    provide: CollectionArrayService,
                    useValue: CollectionArrayServiceSpy,
                },
            ],
            imports: [ReactiveFormsModule],
        }).compileComponents();

        fixture = TestBed.createComponent(AddTaskComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create a task when calling createTask with valid form', () => {
        component.newTaskGroup.setValue({
            description: 'Test Description',
            endDate: '',
            collectionTask: 'Test Collection',
        });

        CopyBDServiceSpy.addTasks.and.returnValue(new Observable<object>());
        component.createTask();

        expect(CopyBDServiceSpy.addTasks).toHaveBeenCalled();
        expect(DialogRefSpy.close).toHaveBeenCalled();
    });

    it('should not create a task when calling createTask with an invalid form', () => {
        component.newTaskGroup.setValue({
            description: '',
            endDate: '',
            collectionTask: 'Test Collection',
        });

        component.createTask();

        expect(CopyBDServiceSpy.addTasks).not.toHaveBeenCalled();
    });
});
