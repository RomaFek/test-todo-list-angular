import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardTaskComponent } from './card-task.component';
import { ITask } from '../../../../../shared/model/task-model';
import { IMiniTask } from '../../add-sub-task/models/add-sub-task-model';
import { TaskCompleteService } from './service/task-complete.service';
import { AddMiniTaskService } from '../service/add-add-sub-task.service';
import { CopyBDService } from '../../dashboard/services/copy-bd.service';
import { DestroyService } from '../../../../../shared/service/destroy.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalService } from '../../../../../navbar/services/modal.service';

describe('CardTaskComponent', () => {
    let component: CardTaskComponent;
    let fixture: ComponentFixture<CardTaskComponent>;

    let CopyBDServiceSpy: jasmine.SpyObj<CopyBDService>;
    let TaskCompleteServiceSpy: jasmine.SpyObj<TaskCompleteService>;
    let AddMiniTaskServiceSpy: jasmine.SpyObj<AddMiniTaskService>;
    let ModalServiceSpy: jasmine.SpyObj<ModalService>;
    let mockTaskData: ITask[];
    let mockMiniTasks: IMiniTask[];

    beforeEach(() => {
        mockTaskData = [
            {
                id: 1,
                description: 'Task 1',
                endDate: '2023-10-30',
                collectionTask: 'Work',
                isCompleted: false,
            },
            {
                id: 2,
                description: 'Task 2',
                endDate: '2023-10-31',
                collectionTask: 'Personal',
                isCompleted: true,
            },
        ];

        mockMiniTasks = [
            {
                id: 1,
                task_id: 1,
                isCompleted: false,
                description: 'Mini Task 1',
            },
        ];

        CopyBDServiceSpy = jasmine.createSpyObj('CopyBDService', [
            'updateTask',
        ]);
        TaskCompleteServiceSpy = jasmine.createSpyObj('TaskCompleteService', [
            'changeTaskCompleted',
        ]);
        AddMiniTaskServiceSpy = jasmine.createSpyObj('AddMiniTaskService', [
            'allMiniTasks',
            'checkMiniTasks',
        ]);
        ModalServiceSpy = jasmine.createSpyObj('ModalService', [
            'openAddMiniTaskModal',
        ]);

        TestBed.configureTestingModule({
            declarations: [CardTaskComponent],
            providers: [
                DestroyService,
                { provide: CopyBDService, useValue: CopyBDServiceSpy },
                {
                    provide: TaskCompleteService,
                    useValue: TaskCompleteServiceSpy,
                },
                {
                    provide: AddMiniTaskService,
                    useValue: AddMiniTaskServiceSpy,
                },
                { provide: ModalService, useValue: ModalServiceSpy },
            ],
            imports: [MatDialogModule],
        });

        fixture = TestBed.createComponent(CardTaskComponent);
        component = fixture.componentInstance;
    });

    it('should create the components', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle dropDown property when clicking the dropdown button', () => {
        expect(component.dropDown).toBeTrue();

        component.clickDropDown();
        expect(component.dropDown).toBeFalse();

        component.clickDropDown();
        expect(component.dropDown).toBeTrue();
    });

    it('should toggle dropDownMiniTask property when clicking the mini task dropdown button', () => {
        expect(component.dropDownMiniTask).toBeTrue();

        component.clickDropDownMiniTask();
        expect(component.dropDownMiniTask).toBeFalse();

        component.clickDropDownMiniTask();
        expect(component.dropDownMiniTask).toBeTrue();
    });

    // it('should update the task when dropping on a collection', () => {
    //     const event = new DragEvent('drop');
    //     const task = mockTaskData[0];
    //     const collection = 'Personal';
    //
    //     spyOn(event, 'preventDefault');
    //     components.onDrop(event, collection);
    //
    //     expect(event.preventDefault).toHaveBeenCalled();
    //     expect(CopyBDServiceSpy.updateTask).toHaveBeenCalledWith({...task, collectionTask: collection});
    // }); ne vizivaetsya

    it('should open the Add Mini Task modal', () => {
        const mockTask = mockTaskData[0];

        component.openAddMiniTaskModal(mockTask);
        expect(ModalServiceSpy.openAddMiniTaskModal).toHaveBeenCalledWith(
            mockTask,
        );
    });
});
