import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { TokenStorage } from '../features/auth/token.storage';
import { Router } from '@angular/router';

@Injectable()
export class AuthService{
    private loggedIn = false;
    public isAdmin = false;
    private _currentUser$ = new BehaviorSubject<any>(null);

    constructor(private http: HttpClient, private token: TokenStorage, private router: Router){
        this.setData();
    }

    setData(){
        let token = this.token.getToken();
        if(token){
            this.loggedIn = true;
            let user = JSON.parse(token);
            this.isAdmin = user.is_admin;
            this.settUser(user);
            if(this.isAdmin){
                this.router.navigateByUrl('/admin');
            }else{
                this.router.navigateByUrl('/');
            }
        }
    }

    login(credentials: {email: string, password: string}): Observable<Boolean>{
        return Observable.create(observer => {
            return this.http.post('/login', credentials)
            .subscribe(data => {
                if(data['status']){
                    this.loggedIn = true;
                    observer.next(true);
                    this.token.saveToken(JSON.stringify(data['data']));
                    let user = data['data'];
                    this.isAdmin = user.is_admin;
                    this.settUser(user);
                    observer.complete();
                }else{
                    observer.next(false);
                    observer.complete();
                }
            });
        })
    }

    register(credentials){
            return this.http.post('/signup', credentials)
    }

    logout(){
        this.loggedIn = false;
        this.token.signOut();
        this.http.get('/logout').subscribe(data => {
            this.router.navigateByUrl('/auth/login');
        });
    }

    isAuthenticated(){
        return this.loggedIn;
    }

    getUser(): Observable<any> {
        return this._currentUser$.asObservable();
    }

    settUser(value) {
        // let user = this.jwtDecode(value);
        this._currentUser$.next(value);
    }
}