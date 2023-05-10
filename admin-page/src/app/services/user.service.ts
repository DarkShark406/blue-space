import { Injectable } from '@angular/core';
import { IUserLogin, User } from '../interfaces/user';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
const USER_KEY = 'UserAdmin';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  USER_URL = 'http://localhost:5000/auth/';
  USER_LOGIN_URL = 'http://localhost:5000/auth/login';
  CHANGE_PASSWORD_URL = 'http://localhost:5000/orders/change-password';

  private userSubject = new BehaviorSubject<User>(
    this.getUserFromLocalStorage()
  );

  public userObservable: Observable<User>;

  constructor(private http: HttpClient) {
    this.userObservable = this.userSubject.asObservable();
  }
  public get currentUser(): User {
    return this.userSubject.value;
  }

  login(userLogin: IUserLogin) {
    return this.http.post<User>(this.USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          alert(`Welcome to BlueSpace ${user.name}!\nLogin Successful!`);
        },
        error: (errorResponse) => {
          alert('Username or password is invalid!\nPlease try again.');
        },
      })
    );
  }

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  generateNewPassword(email: string) {
    return this.http.put<any>(this.USER_URL + 'forget-password', { email });
  }
  changePassword(newPass: string, currentPass: string) {
    const body = {
      currentPassword: currentPass,
      newPassword: newPass,
    };
    return this.http.put<any>(this.USER_URL + 'change-password', body);
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }
  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
}
