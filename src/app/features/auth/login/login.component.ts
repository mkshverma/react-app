import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FieldConfig } from '../../../shared/fields.interface';
import { Validators } from '@angular/forms';
import { DynamicFormComponent } from '../../../shared/components/dynamic-form/dynamic-form.component';
import { FlashService } from '../../../services/flash.service';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  loginConfig: FieldConfig[] = [
    {
      type: "input",
      label: "Email Address",
      inputType: "email",
      name: "email",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Email Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern(
            "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
            ),
            message: "Invalid email"
          }
        ]
      },{
        type: "input",
        label: "Password",
        inputType: "password",
        name: "password",
        validations: [
          {
            name: "required",
            validator: Validators.required,
            message: "Password Required"
          }
        ]
      },{
        type: "button",
        label: "Login",
        inputType: "submit",
        name: "submit"
      },
    ];
    constructor(private authService : AuthService, private router: Router, private fl: FlashService, private loaderService: LoaderService) { }
    
    ngOnInit() {
    }
    
    onLogin(){
      const creds = {
        email: this.form.form.get('email').value, 
        password: this.form.form.get('password').value
      };
      this.loaderService.startLoading();
      this.authService.login(creds).subscribe((data) => {
        if(data){
          this.router.navigateByUrl('/admin');
        }else{
          this.fl.flash('Invalid username or password','danger');
        }
        this.loaderService.stopLoading();
      });
    }
  }
  