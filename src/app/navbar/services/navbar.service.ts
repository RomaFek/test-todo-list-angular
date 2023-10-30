import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NavbarService {
    private sidenavVisible = new BehaviorSubject<boolean>(false);
    public sidenavVisible$ = this.sidenavVisible.asObservable();

    private menuVisible = new BehaviorSubject<boolean>(false);
    public menuVisible$ = this.menuVisible.asObservable();

    private btnLighting = new BehaviorSubject<boolean>(false);
    public btnLighting$ = this.btnLighting.asObservable();

    constructor() {}

    public openSidenav() {
        this.sidenavVisible.next(true);
    }

    public closeSidenav() {
        this.sidenavVisible.next(false);
    }

    public openMenu() {
        this.menuVisible.next(true);
    }

    public closeMenu() {
        this.menuVisible.next(false);
    }

    public onPage() {
        this.btnLighting.next(true);
    }

    public leaveOnPage() {
        this.btnLighting.next(false);
    }
}
