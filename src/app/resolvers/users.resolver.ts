import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Injectable()
export class UsersResolver implements Resolve<User[]>{
    constructor(private userService: UserService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> | Promise<User[]> | User[]{
        return this.userService.getUsers();
    }
}