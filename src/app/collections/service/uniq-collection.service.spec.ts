import {TestBed} from '@angular/core/testing';
import {UniqCollectionService} from './uniq-collection.service';
import {ITask} from "../../add-task/models/task-model";

describe('UniqCollectionService', () => {
    let service: UniqCollectionService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(UniqCollectionService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return unique collections', () => {
        const tasks: ITask[] = [
            {id: 1, description: 'qwe', endDate: '11.11.11', isCompleted: false, collectionTask: 'Work'},
            {id: 2, description: 'qwe', endDate: '11.11.11', isCompleted: false, collectionTask: 'Personal'},
            {id: 3, description: 'qwe', endDate: '11.11.11', isCompleted: false, collectionTask: 'Work'},
            {id: 4, description: 'qwe', endDate: '11.11.11', isCompleted: false, collectionTask: 'Health'},

        ];

        const uniqueCollections = service.getUniqueCollections(tasks);
        expect(uniqueCollections).toEqual(['Work', 'Personal', 'Health']);
    });


    it('should handle null tasks', () => {
        const tasks = null;
        const uniqueCollectionTasks = service.getUniqueCollectionTasks(tasks);
        expect(uniqueCollectionTasks).toEqual([]);
    });
});
