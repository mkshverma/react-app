import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('username') username: ElementRef;
  @ViewChild('password') password: ElementRef;
  constructor(private authService : AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLogin(e:  Event){
    e.preventDefault();
    // console.log(this.username);
    const creds = {
      email: this.username.nativeElement.value, 
      password: this.password.nativeElement.value
    };
    this.authService.login(creds).subscribe((data) => {
      if(data){
          this.router.navigateByUrl('/admin');
      }
  });
    // this.router.navigate(['/admin']);
  }

}
