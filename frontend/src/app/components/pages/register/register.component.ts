import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  isShowPassword = false;
  isShowRetypePassword = false;

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

  clearClassIsInvalid(id: string) {
    document.getElementById(id)?.classList.remove('is-invalid');
  }
}
