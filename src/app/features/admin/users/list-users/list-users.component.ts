import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit {
  users: User[];
  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => { 
        this.users = data['users'].users; 
    });
  }

  onDelete(user: User){
    this.userService.deleteUser(user)
    .subscribe((resp) => {
       this.refreshUsers();
      });
  }
  refreshUsers(){
    this.userService.getUsers( ).subscribe(
      (users) => { this.users = users['users'] },
      (error: HttpErrorResponse) =>  { console.log(error.message); }
    );
  }
}
