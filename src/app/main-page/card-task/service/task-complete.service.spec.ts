import {TestBed} from '@angular/core/testing';
import {TaskCompleteService} from './task-complete.service';
import {CopyBDService} from '../../dashboard/services/copy-bd.service';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {ITask} from "../../../add-task/models/task-model";
import {of} from "rxjs";

describe('TaskCompleteService', () => {
    let service: TaskCompleteService;
    let CopyBDServiceSpy: jasmine.SpyObj<CopyBDService>;

    beforeEach(() => {
        CopyBDServiceSpy = jasmine.createSpyObj('copyBDService', ['updateTask', 'getOneTask']);
        TestBed.configureTestingModule({
            providers: [
                HttpClient,
                HttpHandler,
                TaskCompleteService,
                {provide: CopyBDService, useValue: CopyBDServiceSpy},
            ],
        });
        service = TestBed.inject(TaskCompleteService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should change task completion status', () => {
        const task: ITask = {
            id: 1,
            description: 'Test Task',
            endDate: '2023-10-01',
            collectionTask: 'Work',
            isCompleted: false,
        };

        CopyBDServiceSpy.getOneTask.and.returnValue(of(task));
        CopyBDServiceSpy.updateTask.and.returnValue(of([task]));


        service.changeTaskCompleted(task);

        expect(CopyBDServiceSpy.getOneTask).toHaveBeenCalledWith(task.id);
        expect(CopyBDServiceSpy.updateTask).toHaveBeenCalledWith({
            ...task,
            isCompleted: !task.isCompleted,
        });
    });

});
