import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FieldConfig } from '../../../shared/fields.interface';
import { Validators, FormGroup } from '@angular/forms';
import { DynamicFormComponent } from '../../../shared/components/dynamic-form/dynamic-form.component';
import { FlashService } from '../../../services/flash.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  registerConfig: FieldConfig[] = [
    {
      type: "input",
      label: "Firstname",
      inputType: "text",
      name: "firstname",
      validations: [
        {
          name: "required",
          validator: Validators.required,
          message: "Firstname is Required"
        },
        {
          name: "pattern",
          validator: Validators.pattern(
            "^[a-zA-Z ]{3,50}$"
            ),
            message: "Must contain only alphabets"
          }
        ]
      },
      {
        type: "input",
        label: "Lastname",
        inputType: "text",
        name: "lastname",
        validations: [
          {
            name: "pattern",
            validator: Validators.pattern(
              "^[a-zA-Z ]{3,50}$"
              ),
              message: "Must contain only alphabets"
            }
          ]
        },
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
        type: "input",
        label: "Confirm Password",
        inputType: "password",
        name: "confirmpassword",
        validations: [
        ]
      },{
        type: "button",
        label: "Login",
        inputType: "submit",
        name: "submit"
      },
    ];
    constructor(private authService : AuthService, private router: Router, private fl: FlashService) { }
    
    ngOnInit() {
    }
    checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  let pass = group.get('password').value;
  let confirmPass = group.get('confirmpassword').value;

  return pass === confirmPass ? null : { notSame: true }     
}
    onRegister(){
      const creds = {
        firstname: this.form.form.get('firstname').value, 
        lastname: this.form.form.get('lastname').value, 
        email: this.form.form.get('email').value, 
        password: this.form.form.get('password').value,
        confirmpassword: this.form.form.get('confirmpassword').value,
      };
      this.authService.register(creds).subscribe((data) => {
        if(data){
          this.router.navigateByUrl('/admin');
        }else{
          this.fl.flash('Invalid username or password','danger');
        }
      });
    }
  }
  