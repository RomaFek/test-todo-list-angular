import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CollectionsComponent} from './collections.component';
import {NavbarService} from '../../navbar/services/navbar.service';
import {ModalService} from '../../add-task/services/modal.service';
import {CopyBDService} from '../../main-page/dashboard/services/copy-bd.service';
import {UniqCollectionService} from '../service/uniq-collection.service';
import {NavbarComponent} from "../../navbar/component/navbar.component";
import {MatIconModule} from "@angular/material/icon";

describe('CollectionsComponent', () => {
    let component: CollectionsComponent;
    let fixture: ComponentFixture<CollectionsComponent>;
    let NavbarServiceSpy: jasmine.SpyObj<NavbarService>;
    let ModalServiceSpy: jasmine.SpyObj<ModalService>;
    let CopyBDServiceSpy: jasmine.SpyObj<CopyBDService>;
    let UniqCollectionServiceSpy: jasmine.SpyObj<UniqCollectionService>;

    beforeEach(async(() => {
        NavbarServiceSpy = jasmine.createSpyObj('NavbarService', ['closeMenu', 'onPage', 'leaveOnPage']);
        ModalServiceSpy = jasmine.createSpyObj('ModalService', ['openAddCollect']);
        CopyBDServiceSpy = jasmine.createSpyObj('CopyBDService', ['allTasks']);
        UniqCollectionServiceSpy = jasmine.createSpyObj('UniqCollectionService', ['getUniqueCollectionTasks']);

        TestBed.configureTestingModule({
            declarations: [CollectionsComponent, NavbarComponent],
            providers: [
                {provide: NavbarService, useValue: NavbarServiceSpy},
                {provide: ModalService, useValue: ModalServiceSpy},
                {provide: CopyBDService, useValue: CopyBDServiceSpy},
                {provide: UniqCollectionService, useValue: UniqCollectionServiceSpy},
            ],
            imports: [MatIconModule]
        }).compileComponents();
        fixture = TestBed.createComponent(CollectionsComponent);
        component = fixture.componentInstance;
    }))

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should close menu and call onPage on init', () => {
        component.ngOnInit();
        expect(NavbarServiceSpy.closeMenu).toHaveBeenCalled();
        expect(NavbarServiceSpy.onPage).toHaveBeenCalled();
    });

    it('should open Add Collect modal', () => {
        component.addCollection();
        expect(ModalServiceSpy.openAddCollect).toHaveBeenCalled();
    });

    it('should call leaveOnPage on destroy', () => {
        component.ngOnDestroy();
        expect(NavbarServiceSpy.leaveOnPage).toHaveBeenCalled();
    });
});
