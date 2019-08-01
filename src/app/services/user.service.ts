import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = environment.apiUrl;
@Injectable()
export class UserService{

    constructor(private http: HttpClient){}

      getUsers() {
          return this.http.get<User[]>(API_URL+'/user');
      }

      getUser(id){
        return this.http.get<User>(API_URL+'/user/'+id);
    }

      addUser(user: User){
        return this.http.post(API_URL+'/user', user);
      }

      updateUser(user: User){
        return this.http.put(API_URL+'/user/'+user.user_id, user);
      }

      deleteUser(user: User)
      {
        return this.http.delete(API_URL+'/user/'+user.user_id);
      }

}