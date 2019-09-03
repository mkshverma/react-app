import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostsComponent } from './posts.component';
import { ListPostComponent } from './list-post/list-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostsResolver } from 'src/app/resolvers/posts.resolver';

const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
    children: [
      {
        path: '',
        component: ListPostComponent,
        resolve: {
          posts: PostsResolver
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
