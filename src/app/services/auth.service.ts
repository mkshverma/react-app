import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

import { TokenStorage } from '../auth/token.storage';

@Injectable()
export class AuthService{
    private loggedIn = false;
    private _currentUser;
    public get currentUser() {
        return this._currentUser;
    }
    public set currentUser(value) {
        this._currentUser = value;
    }

    constructor(private http: HttpClient, private token: TokenStorage){}
    login(credentials: {email: string, password: string}): Observable<Boolean>{
        return Observable.create(observer => {
            return this.http.post('/api/login', credentials)
            .subscribe(data => {
                if(data['status']){
                    this.loggedIn = true;
                    observer.next(true);
                    this.token.saveToken(data['token']);
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
}