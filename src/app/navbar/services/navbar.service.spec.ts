import {NavbarService} from './navbar.service';

describe('NavbarService', () => {
    let service: NavbarService;

    beforeEach(() => {
        service = new NavbarService();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should initially have sidenavVisible$ as false', () => {
        service.sidenavVisible$.subscribe((value) => {
            expect(value).toBeFalsy();
        });
    });

    it('should open sidenav', () => {
        service.openSidenav();
        service.sidenavVisible$.subscribe((value) => {
            expect(value).toBeTruthy();
        });
    });

    it('should close sidenav', () => {
        service.closeSidenav();
        service.sidenavVisible$.subscribe((value) => {
            expect(value).toBeFalsy();
        });
    });

    it('should initially have menuVisible$ as false', () => {
        service.menuVisible$.subscribe((value) => {
            expect(value).toBeFalsy();
        });
    });

    it('should open menu', () => {
        service.openMenu();
        service.menuVisible$.subscribe((value) => {
            expect(value).toBeTruthy();
        });
    });

    it('should close menu', () => {
        service.closeMenu();
        service.menuVisible$.subscribe((value) => {
            expect(value).toBeFalsy();
        });
    });

    it('should initially have btnLighting$ as false', () => {
        service.btnLighting$.subscribe((value) => {
            expect(value).toBeFalsy();
        });
    });

    it('should turn on btnLighting', () => {
        service.onPage();
        service.btnLighting$.subscribe((value) => {
            expect(value).toBeTruthy();
        });
    });

    it('should turn off btnLighting', () => {
        service.leaveOnPage();
        service.btnLighting$.subscribe((value) => {
            expect(value).toBeFalsy();
        });
    });
});
