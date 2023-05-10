import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUserLogin } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  user: IUserLogin = new IUserLogin();
  returnUrl = '';
  message = '';
  constructor(private userService: UserService, private router: Router) {}
  ngOnInit() {
    if (this.userService.currentUser.isAdmin == true)
      this.router.navigateByUrl('/');
  }
  login() {
    this.userService
      .login({
        email: this.user.email,
        password: this.user.password,
      })
      .subscribe(() => {
        setTimeout(() => {
          location.reload();
        }, 10);
      });
  }

  clearClassIsInvalid(inputId: string) {
    document.getElementById(inputId)?.classList.remove('is-invalid');
  }
}
