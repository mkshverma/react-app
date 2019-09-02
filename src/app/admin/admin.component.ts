import { Component, OnInit } from '@angular/core';
import { Menu } from '../models/menu.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
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
  constructor() { }

  ngOnInit() {
  }

  toggleSideNav()
  {
    this.isSideNavOpen = !this.isSideNavOpen;
  }
}
