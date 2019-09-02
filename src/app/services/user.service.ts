import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService{

    constructor(private http: HttpClient){}

      getUsers() {
          return this.http.get<User[]>('/users');
      }

      getUser(id){
        return this.http.get<User>('/user/'+id);
    }

      addUser(user: User){
        return this.http.post('/user', user);
      }

      updateUser(user: User){
        return this.http.put('/user/'+user.user_id, user);
      }

      deleteUser(user)
      {
        return this.http.delete('/user/'+user._id);
      }

}