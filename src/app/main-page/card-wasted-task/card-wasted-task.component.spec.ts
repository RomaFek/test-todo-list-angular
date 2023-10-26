import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CardWastedTaskComponent} from './card-wasted-task.component';
import {ITask} from '../../add-task/models/task-model';
import {IMiniTask} from '../mini-task/models/mini-task-model';
import {CopyBDService} from '../dashboard/services/copy-bd.service';
import {TaskCompleteService} from '../card-task/service/task-complete.service';
import {AddMiniTaskService} from '../card-task/service/add-mini-task.service';
import {ModalService} from '../../add-task/services/modal.service';

describe('CardWastedTaskComponent', () => {
    let component: CardWastedTaskComponent;
    let fixture: ComponentFixture<CardWastedTaskComponent>;

    let mockTaskData: ITask[];
    let mockMiniTasks: IMiniTask[];
    let mockTaskService: jasmine.SpyObj<CopyBDService>;
    let mockTaskCompleteService: jasmine.SpyObj<TaskCompleteService>;
    let mockAddMiniTaskService: jasmine.SpyObj<AddMiniTaskService>;
    let mockModalService: jasmine.SpyObj<ModalService>;

    beforeEach(async () => {
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

        mockTaskService = jasmine.createSpyObj('CopyBDService', ['updateTask', 'allTasks']);
        // mockTaskService.allTasks.and.returnValue(of(mockTaskData))

        mockTaskCompleteService = jasmine.createSpyObj('TaskCompleteService', ['changeTaskCompleted']);
        // mockTaskCompleteService.changeTaskCompleted.and.returnValue(of(null));

        mockAddMiniTaskService = jasmine.createSpyObj('AddMiniTaskService', ['allMiniTasks', 'checkMiniTasks']);
        // mockAddMiniTaskService.allMiniTasks = of(mockMiniTasks);
        // mockAddMiniTaskService.checkMiniTasks.and.returnValue(of(null));

        mockModalService = jasmine.createSpyObj('ModalService', ['openAddMiniTaskModal']);

        await TestBed.configureTestingModule({
            declarations: [CardWastedTaskComponent],
            providers: [
                {provide: CopyBDService, useValue: mockTaskService},
                {provide: TaskCompleteService, useValue: mockTaskCompleteService},
                {provide: AddMiniTaskService, useValue: mockAddMiniTaskService},
                {provide: ModalService, useValue: mockModalService},
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(CardWastedTaskComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    // it('should emit drag event when dragging a task', () => {
    //     const event = new DragEvent('dragstart');
    //     const task = mockTaskData[0];
    //
    //     spyOn<DataTransfer, any>(event.dataTransfer, 'setData');
    //     component.onDragStart(event, task);
    //
    //     expect(event.dataTransfer.setData).toHaveBeenCalledWith('text/plain', JSON.stringify(task));
    // });   //EVent.dataTransfer is possibly null

    // it('should update the task when dropping on a collection', () => {
    //     const event = new DragEvent('drop');
    //     const task = mockTaskData[0];
    //     const collection = 'Personal';
    //
    //     spyOn(event, 'preventDefault');
    //
    //     component.onDrop(event, collection);
    //
    //     expect(event.preventDefault).toHaveBeenCalled();
    //     expect(mockTaskService.updateTask).toHaveBeenCalledWith({...task, collectionTask: collection});
    // });  NE VIZIVAETSYA

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


});
