import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

import { TokenStorage } from '../auth/token.storage';

@Injectable()
export class AuthService{
    private loggedIn = false;
    public isAdmin = false;
    private _currentUser$: Subject<any>;

    constructor(private http: HttpClient, private token: TokenStorage){}
    login(credentials: {email: string, password: string}): Observable<Boolean>{
        return Observable.create(observer => {
            return this.http.post('/api/login', credentials)
            .subscribe(data => {
                if(data['status']){
                    this.loggedIn = true;
                    observer.next(true);
                    this.token.saveToken(data['token']);
                    let user = jwt_decode(data['token']);
                    this.isAdmin = user.isAdmin;
                    this.settUser(data['token']);
                    observer.complete();
                }else{
                    observer.next(false);
                    observer.complete();
                }
            });
        })
    }

    logout(){
        this.loggedIn = false;
    }

    isAuthenticated(){
        return new Promise(
            (resolve, reject) => {
                resolve(this.loggedIn);
            }
        );
    }

    getUser(): Observable<any> {
        return this._currentUser$;
    }

    settUser(value) {
        // let user = this.jwtDecode(value);
        this._currentUser$.next(value);
    }
}