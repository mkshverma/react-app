import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../../services/post.service';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {
  posts = [];
  constructor( private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => { 
        this.posts = data['posts'].posts; 
    });
  }

  getPosts(){
    this.postService.getPosts().subscribe(data =>{
      this.posts = data['posts'];
    })
  }

  onDelete(postId){
    this.postService.deletePost(postId).subscribe(data => {
        this.getPosts();
    })
  }

}
