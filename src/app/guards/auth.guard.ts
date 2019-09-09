import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild{
    constructor(private authService: AuthService, private router: Router){}
    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean
    {
        let auth = this.authService.isAuthenticated()
        if(auth){
            return true;
        }else{
            this.router.navigateByUrl('/auth/login');
            return false;
        }
    }

    canActivateChild(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean
    {
        return this.canActivate(route,state);
    }

}