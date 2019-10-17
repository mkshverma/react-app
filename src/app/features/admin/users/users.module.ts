import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListUsersComponent } from './list-users/list-users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UsersComponent } from './users.component';
import { UserService } from '../../../services/user.service';
import { UserResolver } from '../../../resolvers/user.resolver';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersResolver } from '../../../resolvers/users.resolver';

@NgModule({
  declarations: [ListUsersComponent, EditUserComponent, UsersComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule
  ],
  providers:[UserService, UserResolver, UsersResolver]
})
export class UsersModule { }
