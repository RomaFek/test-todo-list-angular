import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const mainGuard: CanActivateFn = (route, state) => {
    const router = inject(Router)
    const token = sessionStorage.getItem('authenticated')
    if (!token) {
        return true;
    } else {
        router.navigate([''])
        return false
    }
};
