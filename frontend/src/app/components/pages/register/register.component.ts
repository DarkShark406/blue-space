import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUserRegister } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  isShowPassword = false;
  isShowRetypePassword = false;

  user: IUserRegister = new IUserRegister();
  name: boolean = true;
  email: boolean = true;
  password: boolean = true;
  fname = '';
  lname = '';

  constructor(private userService: UserService, private router: Router) {}

  register() {
    this.user.name = this.fname + ' ' + this.lname;
    this.validateBlank();
    this.validateEmail();
    this.validatePassword();
    if (this.name && this.email && this.password) {
      this.userService.register(this.user).subscribe((_) => {
        this.router.navigateByUrl('');
      });
    }
  }

  validatePassword() {
    if (
      this.user.password != null &&
      this.user.password == this.user.confirmPassword
    )
      this.password = true;
    else this.password = false;
  }

  validateBlank() {
    if (this.user.name == ' ') this.name = false;
    else this.name = true;
  }

  validateEmail() {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    this.email = pattern.test(this.user.email);
  }

  showHidePasswordInput() {
    if (this.isShowPassword == false) {
      document.getElementById('eye-show-password')?.classList.add('active');
      document.getElementById('eye-hide-password')?.classList.remove('active');
      document.getElementById('password-input')?.setAttribute('type', 'text');
    } else {
      document.getElementById('eye-show-password')?.classList.remove('active');
      document.getElementById('eye-hide-password')?.classList.add('active');
      document
        .getElementById('password-input')
        ?.setAttribute('type', 'password');
    }
    this.isShowPassword = !this.isShowPassword;
  }

  showHideRetypePasswordInput() {
    if (this.isShowRetypePassword == false) {
      document
        .getElementById('eye-show-retypepassword')
        ?.classList.add('active');
      document
        .getElementById('eye-hide-retypepassword')
        ?.classList.remove('active');
      document
        .getElementById('retypepassword-input')
        ?.setAttribute('type', 'text');
    } else {
      console.log('vào true');
      document
        .getElementById('eye-show-retypepassword')
        ?.classList.remove('active');
      document
        .getElementById('eye-hide-retypepassword')
        ?.classList.add('active');
      document
        .getElementById('retypepassword-input')
        ?.setAttribute('type', 'password');
    }
    this.isShowRetypePassword = !this.isShowRetypePassword;
  }
}
