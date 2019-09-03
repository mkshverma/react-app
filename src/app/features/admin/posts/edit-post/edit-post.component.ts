import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { DynamicFormComponent } from 'src/app/shared/components/dynamic-form/dynamic-form.component';
import { FieldConfig } from 'src/app/shared/fields.interface';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  postId: String;
  postConfig: FieldConfig[] = [
    {
      type: "input",
      label: "Title",
      inputType: "text",
      name: "title",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Title is Required"
        }
      ]
    },
    {
      type: "input",
      label: "Content",
      inputType: "text",
      name: "body",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Body is required"
        }
      ]
    },
    {
      type: "input",
      label: "Tags",
      inputType: "text",
      name: "tags",
      validations: [
        {
          name: "required",
          validator: Validators.pattern(
            "^[a-zA-Z ]+(,[a-zaA-Z ]+)*$"
            ),
            message: "Tags must be comma separated alphabets"
          }
        ]
      },
      {
        type: "button",
        label: "Save"
      }
    ];
    @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
    updateSubscription: Subscription
    constructor( private postService: PostService, private router : Router,private  route:ActivatedRoute) { }
    
    ngOnInit() {
      let slug = this.route.snapshot.params['id'];
      if(slug){
        this.postService.getPost(slug).subscribe(data => {
          if(data['status']){
            this.postId = data['post']._id
            this.form.form.patchValue({
              title: data['post'].title,
              body: data['post'].body,
              tags: data['post'].tags.join(',')
            });
          }
        })
      }
    }
    
    onSave(){
      if(this.postId){
        this.updateSubscription = this.postService.updatePost(this.postId,this.form.value)
        .subscribe((data) => {
          console.log(data);
        });
      }else{
        this.updateSubscription = this.postService.createPost(this.form.value)
        .subscribe((data) => {
          console.log(data);
        });
      }
      this.router.navigate(['/admin/posts']);
    }
  }
  