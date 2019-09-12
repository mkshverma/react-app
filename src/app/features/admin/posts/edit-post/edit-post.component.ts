import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { DynamicFormComponent } from 'src/app/shared/components/dynamic-form/dynamic-form.component';
import { FieldConfig } from 'src/app/shared/fields.interface';
import { Validators } from '@angular/forms';
import { FlashService } from 'src/app/services/flash.service';

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
      type: "textarea",
      label: "Content",
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
        type: "file",
        label: "Post Image",
        name: "image",
        validations: [
          {
            name: "required",
            validator: Validators.required,
              message: "Post image is required"
          }
        ]
      },
      {
        type: "checkbox",
        label: "Publish",
        name: "published",
        },
      {
        type: "button",
        label: "Save"
      }
    ];
    @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
    updateSubscription: Subscription
    constructor( private postService: PostService, private router : Router,private  route:ActivatedRoute, private flash: FlashService) { }
    
    ngOnInit() {
      let slug = this.route.snapshot.params['id'];
      if(slug){
        this.postService.getPost(slug).subscribe(data => {
          if(data['status']){
            this.postId = data['post']._id
            this.form.form.patchValue({
              title: data['post'].title,
              body: data['post'].body,
              tags: data['post'].tags.join(','),
              published: data['post'].published,
              image: data['post'].image
            });
          }
        })
      }
    }
    
    onSave(){
      if(this.postId){
        this.updateSubscription = this.postService.updatePost(this.postId,this.form.value)
        .subscribe((data) => {
          this.flash.flash(data['message'], 'success');
        });
      }else{
        this.updateSubscription = this.postService.createPost(this.form.value)
        .subscribe((data) => {
          this.flash.flash(data['message'], 'success');
        });
      }
      this.router.navigate(['/admin/posts']);
    }
  }
  