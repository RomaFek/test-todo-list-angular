import {CanActivate, Router} from '@angular/router';
import {Injectable} from "@angular/core";

// export const mainGuard: CanActivateFn = (route, state) => {
//     const router = inject(Router)
//     const token = sessionStorage.getItem('authenticated')
//     if (!token) {
//         return true;
//     } else {
//         router.navigate([''])
//         return false
//     }
// };
@Injectable({
    providedIn: 'root',
})
export class MainGuard implements CanActivate {
    constructor(private router: Router) {
    }

    canActivate(): boolean {
        const token = sessionStorage.getItem('authenticated');
        if (!token) {
            return true;
        } else {
            this.router.navigate(['']);
            return false;
        }
    }
}
