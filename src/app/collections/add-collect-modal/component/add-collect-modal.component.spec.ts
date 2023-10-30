import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCollectModalComponent } from './add-collect-modal.component';
import { DialogRef } from '@angular/cdk/dialog';
import { CollectionArrayService } from '../service/collection-array.service';
import { DestroyService } from '../../../shared/service/destroy.service';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddCollectModalComponent', () => {
    let component: AddCollectModalComponent;
    let fixture: ComponentFixture<AddCollectModalComponent>;
    let dialogRefSpy: jasmine.SpyObj<DialogRef>;
    let collectionArrayServiceSpy: jasmine.SpyObj<CollectionArrayService>;

    beforeEach(() => {
        dialogRefSpy = jasmine.createSpyObj('DialogRef', ['close']);
        collectionArrayServiceSpy = jasmine.createSpyObj(
            'CollectionArrayService',
            ['setNewCollect'],
        );
        TestBed.configureTestingModule({
            declarations: [AddCollectModalComponent],
            providers: [
                { provide: DialogRef, useValue: dialogRefSpy },
                {
                    provide: CollectionArrayService,
                    useValue: collectionArrayServiceSpy,
                },
                DestroyService,
            ],
            imports: [ReactiveFormsModule],
        });
        collectionArrayServiceSpy.setNewCollect.and.returnValue(of({}));
        fixture = TestBed.createComponent(AddCollectModalComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize form control', () => {
        fixture.detectChanges();
        expect(component.newCollection).toBeTruthy();
    });

    it('should submit new collection', () => {
        fixture.detectChanges();
        component.newCollection.setValue('New Collection');
        component.onSubmit();

        expect(collectionArrayServiceSpy.setNewCollect).toHaveBeenCalledWith(
            'New Collection',
        );
        expect(dialogRefSpy.close).toHaveBeenCalled();
    });
});
