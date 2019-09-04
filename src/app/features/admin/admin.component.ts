import { Component, OnInit } from '@angular/core';
import { Menu } from '../../models/menu.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  currentUser: any;
  menus: Menu[] = [
    new Menu('/admin','Dashboard'),
    new Menu(
      '/admin/users',
      'Users',
      [
        new Menu('/admin/users','Users List'),
        new Menu('/admin/users/edit','Add User'),
      ]
    ),
    new Menu(
      '/admin/posts',
      'Posts',
      [
        new Menu('/admin/posts','Posts List'),
        new Menu('/admin/posts/edit','Create Post'),
      ]
    )
  ];
  isSideNavOpen : boolean = true;
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  toggleSideNav()
  {
    this.isSideNavOpen = !this.isSideNavOpen;
  }

  logout()
  {
    this.auth.logout();
  }

}
