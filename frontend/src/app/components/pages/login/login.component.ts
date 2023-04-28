import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  clearClassIsInvalid(inputId: string) {
    document.getElementById(inputId)?.classList.remove('is-invalid');
  }
}
