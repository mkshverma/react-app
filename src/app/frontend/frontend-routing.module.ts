import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FrontendComponent } from './frontend.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  {
    path: '',
    component: FrontendComponent,
    children: [
        {
            path: '',
            component: HomeComponent
        },
        {
            path: 'post/:slug',
            component: PostComponent
        }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontendRoutingModule { }
