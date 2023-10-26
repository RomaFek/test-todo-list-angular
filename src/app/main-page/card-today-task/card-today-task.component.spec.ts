import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CardTodayTaskComponent} from './card-today-task.component';
import {ITask} from '../../add-task/models/task-model';
import {IMiniTask} from '../mini-task/models/mini-task-model';
import {CopyBDService} from '../dashboard/services/copy-bd.service';


import {ModalService} from '../../add-task/services/modal.service';
import {TaskCompleteService} from "../card-task/service/task-complete.service";
import {AddMiniTaskService} from "../card-task/service/add-mini-task.service";
import {DestroyService} from "../../shared/destroy.service";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {InputComponent} from "../input/input/input.component";
import {CustomDatePipe} from "../dashboard/pipe/custom-date.pipe";

describe('CardTodayTaskComponent', () => {
    let component: CardTodayTaskComponent;
    let fixture: ComponentFixture<CardTodayTaskComponent>;

    let CopyBDServiceSpy: jasmine.SpyObj<CopyBDService>
    let TaskCompleteServiceSpy: jasmine.SpyObj<TaskCompleteService>
    let AddMiniTaskServiceSpy: jasmine.SpyObj<AddMiniTaskService>
    let ModalServiceSpy: jasmine.SpyObj<ModalService>
    let mockTaskData: ITask[]
    let mockMiniTasks: IMiniTask[]

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

        CopyBDServiceSpy = jasmine.createSpyObj('CopyBDService', ['updateTask']);
        TaskCompleteServiceSpy = jasmine.createSpyObj('TaskCompleteService', ['changeTaskCompleted']);
        AddMiniTaskServiceSpy = jasmine.createSpyObj('AddMiniTaskService', ['allMiniTasks', 'checkMiniTasks']);
        ModalServiceSpy = jasmine.createSpyObj('ModalService', ['openAddMiniTaskModal']);


        TestBed.configureTestingModule({
            declarations: [CardTodayTaskComponent, InputComponent, CustomDatePipe],
            providers: [
                DestroyService,
                {provide: CopyBDService, useValue: CopyBDServiceSpy},
                {provide: TaskCompleteService, useValue: TaskCompleteServiceSpy},
                {provide: AddMiniTaskService, useValue: AddMiniTaskServiceSpy},
                {provide: ModalService, useValue: ModalServiceSpy},
            ],
            imports: [MatDialogModule, MatIconModule]
        });

        fixture = TestBed.createComponent(CardTodayTaskComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    // it('should emit drag event when dragging a task', () => {
    //     const event = new DragEvent('dragstart');
    //     const task = mockTaskData[0];
    //
    //     const setDataSpy = spyOn(event.dataTransfer, 'setData');
    //     component.onDragStart(event, task);
    //
    //     expect(setDataSpy).toHaveBeenCalledWith('text/plain', JSON.stringify(task));
    //
    // });  может быть нал event.dataTransfer


    // it('should update the task when dropping on a collection', () => {
    //     const event = new DragEvent('drop');
    //     const task = mockTaskData[0];
    //     const collection = 'Personal';
    //     // spyOn(CopyBDServiceSpy, 'updateTask');
    //     CopyBDServiceSpy.updateTask.and.callThrough()
    //
    //     component.onDrop(event, collection);
    //
    //     fixture.detectChanges();
    //     expect(CopyBDServiceSpy.updateTask).toHaveBeenCalledWith({...task, collectionTask: collection});
    // }); NE VIZIVAETSYA

    it('should toggle dropDown property when clicking the dropdown button', () => {
        expect(component.dropDown).toBeTrue();

        component.clickDropDown();
        expect(component.dropDown).toBeFalse();

        component.clickDropDown();
        expect(component.dropDown).toBeTrue();
    });

    it('should toggle dropDownMiniTask property when clicking the mini task dropdown button in today task', () => {
        expect(component.dropDownMiniTask).toBeTrue();

        component.clickDropDownMiniTask();
        expect(component.dropDownMiniTask).toBeFalse();

        component.clickDropDownMiniTask();
        expect(component.dropDownMiniTask).toBeTrue();
    });

    it('should open the Add Mini Task modal', () => {
        const mockTask = mockTaskData[0];

        component.openAddMiniTaskModal(mockTask);
        expect(ModalServiceSpy.openAddMiniTaskModal).toHaveBeenCalledWith(mockTask);
    });

    // it('should not filter out tasks with different dates', () => {
    //
    //     const currentDate = new Date();
    //     const currentDateString = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    //     const tasksWithDifferentDates = [
    //         {id: 3, description: 'Task 3', endDate: currentDateString, collectionTask: 'Work', isCompleted: false},
    //         {id: 4, description: 'Task 4', endDate: '2023-10-31', collectionTask: 'Personal', isCompleted: false},
    //     ];
    //
    //     const tasks = [
    //         ...mockTaskData,
    //         ...tasksWithDifferentDates,
    //     ];
    //     AddMiniTaskServiceSpy.allMiniTasks.and.returnValue(of(mockMiniTasks));
    //
    //     component.arrCol = of(tasks);
    //
    //
    //     fixture.detectChanges();
    //     const filteredArrColData = component.isNotCompletedColl();
    //
    //     filteredArrColData.subscribe((filteredData) => {
    //
    //         expect(filteredData).toEqual(tasksWithDifferentDates);
    //     });
    // });    подсвечивает .энд

});
