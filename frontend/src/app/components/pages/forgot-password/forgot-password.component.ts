import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  valid: boolean = true;
  emailValue: any;
  message: any;

  constructor(private userService: UserService, private router: Router) {}
  ngOnInit() {
    if (this.userService.currentUser.id != undefined) {
      this.router.navigateByUrl('/');
    }
  }
  submit() {
    this.userService
      .generateNewPassword(this.emailValue)
      .subscribe((d) => (this.message = d));
  }
  getPassword() {
    this.validateEmail();
    if (this.valid) {
      this.submit();
      const notification = document.getElementById(
        'notification'
      ) as HTMLElement;
      notification.style.display = 'block';
    }
  }
  validateEmail() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.valid = emailRegex.test(this.emailValue);
  }
  gotoChangePassword() {
    this.router.navigateByUrl('/change-password');
  }
}
