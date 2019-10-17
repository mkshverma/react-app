import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: FormGroup;
  updateSubscription: Subscription
  constructor( private userService: UserService, private router : Router,private  route:ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.user = new FormGroup({
      user_id: new FormControl(0,Validators.required),
      display_name: new FormControl(null,Validators.required),
      email: new FormControl(null,Validators.required),
      password: new FormControl(null),
      is_admin: new FormControl(null)
    });
    if(id){
      this.route.data.subscribe(
        (data: Data) => { 
          this.user.patchValue({
            user_id: data['user'].user._id,
            display_name: data['user'].user.name.first,
            email: data['user'].user.email,
            is_admin: data['user'].user.is_admin
        }); 
      }
      );
    }
  }

  onSave(){
    
    if(this.user.controls.user_id.value != 0){
      this.updateSubscription = this.userService.updateUser(this.user.value)
      .subscribe((data) => {
        console.log(data);
      });
    }else{
      this.updateSubscription = this.userService.addUser(this.user.value)
      .subscribe((data) => {
        console.log(data);
      });
    }
    this.router.navigate(['/admin/users']);
  }
}
