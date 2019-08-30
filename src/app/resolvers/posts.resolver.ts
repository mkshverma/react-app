import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { PostService } from '../services/post.service';

@Injectable()
export class PostsResolver implements Resolve<any>{
    constructor(private postService: PostService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any{
        return this.postService.getPosts();
    }
}