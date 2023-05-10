import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.component.css'],
})
export class NavAdminComponent {
  constructor(private userService: UserService) {}
  isAdmin: boolean = false;
  ngOnInit() {
    if (this.userService.currentUser.isAdmin == true) {
      this.isAdmin = true;
    }
  }
  logout() {
    this.userService.logout();
  }
}
