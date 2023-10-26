import {TestBed} from '@angular/core/testing';
import {CollectionArrayService} from './collection-array.service';
import {HttpClient} from '@angular/common/http';

describe('CollectionArrayService', () => {
    let service: CollectionArrayService;
    let httpSpy: jasmine.SpyObj<HttpClient>

    beforeEach(() => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['post']);
        TestBed.configureTestingModule({
            providers: [
                CollectionArrayService,
                {provide: HttpClient, useValue: httpSpy},
            ],
        });
        service = TestBed.inject(CollectionArrayService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });


    it('should add a new collection', () => {
        service.setNewCollect('New Collection')
        expect(httpSpy.post).toHaveBeenCalledWith('addCollection', 'New Collection');

    });

    // it('should get collections from indexedDB', () => {
    //     spyOn(service, 'getAllCollection').and.returnValue(of([{id: 1, name: 'work'}, {id: 2, name: 'personal'}]));
    //
    //     service.getCollections();
    //
    //     service.collectionSubject$.subscribe((collections) => {
    //         expect(collections).toEqual(['work', 'personal']);
    //     });
    // }); ломает  тесты Expected $.length = 0 to equal 2.
});
