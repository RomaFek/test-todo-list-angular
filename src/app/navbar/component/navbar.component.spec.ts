import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { NavbarService } from '../services/navbar.service';
import { ModalService } from '../add-task/services/modal.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    let navbarService: NavbarService;
    let modalService: ModalService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [NavbarComponent],
            providers: [NavbarService, ModalService],
            imports: [MatDialogModule, MatIconModule],
        });

        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        navbarService = TestBed.inject(NavbarService);
        modalService = TestBed.inject(ModalService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open dialog', () => {
        const openModalSpy = spyOn(modalService, 'openModal');
        fixture.detectChanges();
        component.openDialog();
        expect(openModalSpy).toHaveBeenCalled();
    });

    it('should open profile-modal', () => {
        const openProfileSpy = spyOn(modalService, 'openProfile');
        fixture.detectChanges();
        component.openProfile();
        expect(openProfileSpy).toHaveBeenCalled();
    });
});
