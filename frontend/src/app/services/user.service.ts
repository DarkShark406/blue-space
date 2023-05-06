import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUserLogin, IUserRegister, User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
const USER_KEY = 'User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  USER_LOGIN_URL = 'http://localhost:5000/auth/login';
  USER_REGISTER_URL = 'http://localhost:5000/auth/register';

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

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(this.USER_LOGIN_URL, userLogin);
  }
  register(userRegister: IUserRegister): Observable<User> {
    return this.http.post<User>(this.USER_REGISTER_URL, userRegister);
  }

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
