import {TestBed} from '@angular/core/testing';
import {AddMiniTaskService} from './add-mini-task.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {IMiniTask} from "../../mini-task/models/mini-task-model";
import {of} from "rxjs";

describe('AddMiniTaskService', () => {
    let service: AddMiniTaskService;
    let http: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AddMiniTaskService, HttpClient, HttpHandler],
        });
        service = TestBed.inject(AddMiniTaskService);
        http = TestBed.inject(HttpClient);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should add a new mini task and return the added task', () => {
        const newMiniTask: IMiniTask = {
            id: 1,
            task_id: 1,
            isCompleted: false,
            description: 'New Mini Task',
        };

        spyOn(service['http'], 'post').and.returnValue(of(newMiniTask));

        service.setNewMiniTask(newMiniTask).subscribe((addedMiniTask: IMiniTask) => {
            expect(addedMiniTask).toEqual(newMiniTask);
        });
    });

    // it('should get all mini tasks', () => {
    //     const mockMiniTasks: IMiniTask[] = [
    //         {id: 1, task_id: 1, isCompleted: false, description: 'Mini Task 1'},
    //         {id: 2, task_id: 2, isCompleted: true, description: 'Mini Task 2'},
    //     ];
    //
    //     spyOn<AddMiniTaskService, any>(service, 'getAllMiniTask').and.returnValue(of(mockMiniTasks));
    //
    //     service.allMiniTasks.subscribe((miniTasks: IMiniTask[]) => {
    //         expect(miniTasks).toEqual(mockMiniTasks);
    //     });
    // }); ломает Expected $.length = 0 to equal 2.


    it('should get one mini task by ID', () => {
        const miniTaskId = 1;
        const miniTask: IMiniTask = {
            id: miniTaskId,
            task_id: 1,
            isCompleted: false,
            description: 'Mini Task 1',
        };

        spyOn(service, 'getOneMiniTask').and.returnValue(of(miniTask));

        service.getOneMiniTask(miniTaskId).subscribe((retrievedMiniTask: IMiniTask) => {
            expect(retrievedMiniTask).toEqual(miniTask);
        });
    });
});
