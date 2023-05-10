import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  currentValid: boolean = true;
  newValid: boolean = true;
  confirmValid: boolean = true;
  matchValid: boolean = true;
  message: any;
  constructor(private userService: UserService) {}

  changePassword() {
    this.validate();
    const notification = document.getElementById('notification') as HTMLElement;
    notification.style.display = 'block';
    if (this.matchValid && this.newValid) {
      this.userService
        .changePassword(this.newPassword, this.currentPassword)
        .subscribe((d) => {
          this.message = d;
        });
    }
  }
  validate() {
    if (this.currentPassword == '') this.currentValid = false;
    else this.currentValid = true;
    if (this.newPassword == '') this.newValid = false;
    else this.newValid = true;
    if (this.confirmPassword == '') this.confirmValid = false;
    else this.confirmValid = true;
    if (this.newPassword != this.confirmPassword) this.matchValid = false;
    else this.matchValid = true;
  }
  logout() {
    this.userService.logout();
  }
}
