import { Component, OnInit } from '@angular/core';
import { Menu } from '../../models/menu.model';
import { AuthService } from 'src/app/services/auth.service';
import { animations } from 'src/app/shared/animations';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: animations
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
  isCollapseOpen : string = 'closed';
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.getUser().subscribe(data => {
      this.currentUser = data;
    })
  }

  toggleSideNav()
  {
    this.isSideNavOpen = !this.isSideNavOpen;
  }

  toggleState()
  {
    this.isCollapseOpen = this.isCollapseOpen == 'closed'?'open':'closed';
  }

  logout()
  {
    this.auth.logout();
  }

}
