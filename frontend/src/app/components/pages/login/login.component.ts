import { Component } from '@angular/core';
import { IUserLogin } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: IUserLogin = new IUserLogin();
  returnUrl = '';
  message = '';
  constructor(private userService: UserService, private router: Router) {}
  ngOnInit() {
    if (this.userService.currentUser) {
      this.router.navigateByUrl('/');
    }
  }
  login() {
    this.userService
      .login({
        email: this.user.email,
        password: this.user.password,
      })
      .subscribe(() => {
        this.router.navigateByUrl('/');
      });
  }

  clearClassIsInvalid(inputId: string) {
    document.getElementById(inputId)?.classList.remove('is-invalid');
  }
}
