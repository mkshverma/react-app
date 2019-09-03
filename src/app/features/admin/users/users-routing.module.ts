import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListUsersComponent } from './list-users/list-users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UsersComponent } from './users.component';
import { UserResolver } from 'src/app/resolvers/user.resolver';
import { UsersResolver } from 'src/app/resolvers/users.resolver';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: '',
        component: ListUsersComponent,
        resolve: {users: UsersResolver}
      },
      {
        path: 'edit',
        component: EditUserComponent
      },
      {
        path: 'edit/:id',
        component: EditUserComponent,
        resolve: {
          user: UserResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
