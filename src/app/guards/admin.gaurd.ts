import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AdminGuard implements CanLoad{
    constructor(private authService: AuthService, private router: Router){}

    canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
        let admin = this.authService.isAdmin
        if(admin){
            return true;
        }else{
            this.router.navigateByUrl('/auth/login');
            return false;
        }
    }

}