import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ResponseModel from '@core/api/response.model';
import { environment } from '@environments/environment';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, catchError, map, of } from 'rxjs';
import UserModel from './user.model';

@Injectable({
  providedIn: 'root'
})
export default class UserService {
  userState$ = new BehaviorSubject<UserModel | null>(null);
  tokenState$ = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
  }

  register(email: string, password: string, fullname: string) {
    return this.http.post<{ user: UserModel }>(environment.backendUrl + '/auth/register', {
      email,
      password,
      fullname,
      type: 'USER'
    }).pipe(
      map((data) => ({ data: data.user } as ResponseModel)),
      catchError(error => of({ error: error.message } as ResponseModel))
    );
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(environment.backendUrl + '/auth/login', { email, password })
      .pipe(
        map((data) => ({ data: data.token } as ResponseModel)),
        catchError(error => of({ error: error.message } as ResponseModel))
      );
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
    if (token && token != 'undefined') {
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
