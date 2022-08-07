import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import UserModel from './user.model';

@Injectable({
  providedIn: 'root'
})
export default class UserService {
  userState$ = new BehaviorSubject<UserModel | null>(null);
  tokenState$ = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(environment.backendUrl + '/auth/login', { email, password });
  }

  logout() {
    this.userState$.next(null);
    this.tokenState$.next('');
    localStorage.clear();
  }

  getUserState(): UserModel {
    return this.userState$.value as UserModel;
  }

  persistState(token: string) {
    localStorage.setItem('token', token);
    this.refreshState();
  }

  refreshState() {
    const token = localStorage.getItem('token');
    if (token) {
      const userModel = jwt_decode(token) as UserModel;
      if (userModel) {
        this.userState$.next(userModel);
        this.tokenState$.next(token);
      } else {
        this.userState$.next(null);
        this.tokenState$.next('');
      }
    }
  }
}
