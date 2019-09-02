import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostsComponent } from './posts.component';
import { ListPostComponent } from './list-post/list-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';

const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
    children: [
      {
        path: '',
        component: ListPostComponent,
        resolve: {
          // users: UsersResolver
        }
      },
      {
        path: 'edit',
        component: EditPostComponent
      },
      {
        path: 'edit/:id',
        component: EditPostComponent,
        resolve: {
          // user: UserResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
